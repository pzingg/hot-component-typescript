port module Ports.Handsontable exposing
    ( FromElm(..)
    , HotData
    , ToElm(..)
    , hotRequest
    , subscriptions
    )

import Json.Decode as Decode
import Json.Decode.Pipeline as Pipeline
import Json.Encode as Encode


type alias HotSize =
    { domId : String, nRows : Int, nCols : Int }


type alias HotData =
    { domId : String
    , tag : String
    , colHeaders : List String
    , data : List (List String)
    }


type FromElm
    = GetSize { domId : String }
    | GetData { domId : String, tag : String }
    | SetData HotData
    | UpdateFormat { domId : String, formatType : String }
    | AddColumn { domId : String, col : Maybe Int }
    | RemoveColumn { domId : String, col : Maybe Int }
    | AddRow { domId : String, row : Maybe Int }
    | RemoveRow { domId : String, row : Maybe Int }
    | CopyColumn { domId : String, fromCol : Int, toCol : Int }


type ToElm
    = Size HotSize
    | Data HotData
    | DecodingError String


port hotFromElm : Encode.Value -> Cmd msg


port hotToElm : (Decode.Value -> msg) -> Sub msg



-- FROM ELM IMPLEMENTATION


hotRequest : FromElm -> Cmd msg
hotRequest from =
    from
        |> encodeFromElm
        |> hotFromElm


encodeFromElm : FromElm -> Encode.Value
encodeFromElm from =
    case from of
        GetSize { domId } ->
            Encode.object
                [ ( "kind", Encode.string "GetSize" )
                , ( "domId", Encode.string domId )
                ]

        GetData { domId, tag } ->
            Encode.object
                [ ( "kind", Encode.string "GetData" )
                , ( "domId", Encode.string domId )
                , ( "tag", Encode.string tag )
                ]

        SetData { domId, tag, colHeaders, data } ->
            Encode.object
                [ ( "kind", Encode.string "SetData" )
                , ( "domId", Encode.string domId )
                , ( "tag", Encode.string tag )
                , ( "colHeaders", Encode.list Encode.string colHeaders )
                , ( "data", Encode.list (Encode.list Encode.string) data )
                ]

        UpdateFormat { domId, formatType } ->
            Encode.object
                [ ( "kind", Encode.string "UpdateFormat" )
                , ( "domId", Encode.string domId )
                , ( "formatType", Encode.string formatType )
                ]

        AddColumn { domId, col } ->
            Encode.object
                [ ( "kind", Encode.string "AddColumn" )
                , ( "domId", Encode.string domId )
                , ( "col"
                  , case col of
                        Just c ->
                            Encode.int c

                        Nothing ->
                            Encode.null
                  )
                ]

        RemoveColumn { domId, col } ->
            Encode.object
                [ ( "kind", Encode.string "RemoveColumn" )
                , ( "domId", Encode.string domId )
                , ( "col"
                  , case col of
                        Just c ->
                            Encode.int c

                        Nothing ->
                            Encode.null
                  )
                ]

        AddRow { domId, row } ->
            Encode.object
                [ ( "kind", Encode.string "AddRow" )
                , ( "domId", Encode.string domId )
                , ( "row"
                  , case row of
                        Just r ->
                            Encode.int r

                        Nothing ->
                            Encode.null
                  )
                ]

        RemoveRow { domId, row } ->
            Encode.object
                [ ( "kind", Encode.string "RemoveRow" )
                , ( "domId", Encode.string domId )
                , ( "row"
                  , case row of
                        Just r ->
                            Encode.int r

                        Nothing ->
                            Encode.null
                  )
                ]

        CopyColumn { domId, fromCol, toCol } ->
            Encode.object
                [ ( "kind", Encode.string "CopyColumn" )
                , ( "domId", Encode.string domId )
                , ( "fromCol", Encode.int fromCol )
                , ( "toCol", Encode.int toCol )
                ]



-- TO ELM IMPLEMENTATION


subscriptions : (ToElm -> msg) -> Sub msg
subscriptions customTypeConstructor =
    (Decode.decodeValue decodeToElm >> resultWithError >> customTypeConstructor)
        |> hotToElm


decodeToElm : Decode.Decoder ToElm
decodeToElm =
    Decode.field "kind" Decode.string
        |> Decode.maybe
        |> Decode.andThen decodeKind


decodeKind : Maybe String -> Decode.Decoder ToElm
decodeKind kind =
    case kind of
        Nothing ->
            DecodingError "missing kind"
                |> Decode.succeed

        Just "Size" ->
            Decode.succeed HotSize
                |> Pipeline.required "domId" Decode.string
                |> Pipeline.required "nRows" Decode.int
                |> Pipeline.required "nCols" Decode.int
                |> Decode.map Size

        Just "Data" ->
            Decode.succeed HotData
                |> Pipeline.required "domId" Decode.string
                |> Pipeline.required "tag" Decode.string
                |> Pipeline.required "colHeaders" (Decode.list Decode.string)
                |> Pipeline.required "data" (Decode.list (Decode.list Decode.string))
                |> Decode.map Data

        Just other ->
            DecodingError ("invalid kind " ++ other)
                |> Decode.succeed


resultWithError : Result Decode.Error ToElm -> ToElm
resultWithError result =
    case result of
        Ok record ->
            record

        Err error ->
            DecodingError <| Decode.errorToString error
