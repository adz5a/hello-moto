import xstreamConfig from "recompose/xstreamObservableConfig";
import { componentFromStreamWithConfig } from "recompose";

export const componentFromStream = componentFromStreamWithConfig(xstreamConfig);
