module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Ports.Handsontable exposing (FromElm(..), ToElm(..))


type alias Model =
    { nRows : Int
    , nCols : Int
    }


type alias Flags =
    ()


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model 0 0, Ports.Handsontable.hotRequest <| GetSize { domId = "hot-1" } )


type Msg
    = HotMessage Ports.Handsontable.ToElm


hot : List (Html.Attribute msg) -> List (Html msg) -> Html msg
hot =
    Html.node "hot-table"


view : Model -> Browser.Document Msg
view model =
    { body =
        [ h1 []
            [ text "Handsontable Test" ]
        , hot
            [ id "hot-1"
            , attribute "datarows" "[[\"\", \"Tesla\", \"Volvo\", \"Toyota\", \"Honda\"],[\"2017\", 10, 11, 12, 13],[\"2018\", 20, 11, 14, 13],[\"2019\", 30, 15, 12, 13]]"
            ]
            []
        , p [] [ text ("nRows: " ++ String.fromInt model.nRows) ]
        , p [] [ text ("nCols: " ++ String.fromInt model.nCols) ]
        ]
    , title =
        "Handsontable With TypeScript"
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        HotMessage toElm ->
            case toElm of
                Size { nRows, nCols } ->
                    ( { model | nRows = nRows, nCols = nCols }, Cmd.none )

                Data data ->
                    let
                        _ =
                            Debug.log "Data" data
                    in
                    ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


main : Program Flags Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = (\_ -> Ports.Handsontable.subscriptions HotMessage)
        }
