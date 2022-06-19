import type { IncomingMessage, ServerResponse } from "http";

export interface IServerRequest extends IncomingMessage {
  body: any;
  query: URL | null;
}

export interface IServerResponse extends ServerResponse {}

export type ServerMethodHandler = (
  request: IServerRequest,
  response: ServerResponse
) => {};

export type ServerController = (
  request: IServerRequest,
  response: ServerResponse
) => {};
