import { createContext, useState } from "react"
import { Event, hydrateClientStorage, useEventLoop } from "/utils/state.js"

export const initialState = {"age": 0, "email": "", "gender": "Other", "get_users": [{"id": 1, "name": "Yuheon Joh John", "email": "notjohn@gmail.com", "age": 69, "gender": "Other", "school": "Pre-School", "major": "Child Specialist"}, {"id": 2, "name": "test", "email": "test@gmail.com", "age": 10, "gender": "Other", "school": "test", "major": "test"}, {"id": 3, "name": "sebastian", "email": "laskdjsalkdj@gmai.com", "age": 12, "gender": "Other", "school": "mit", "major": "psych"}], "is_hydrated": false, "major": "", "name": "", "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}, "school": "", "users": []}

export const ColorModeContext = createContext(null);
export const StateContext = createContext(null);
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
]

export const isDevMode = true

export function EventLoopProvider({ children }) {
  const [state, addEvents, connectError] = useEventLoop(
    initialState,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </EventLoopContext.Provider>
  )
}