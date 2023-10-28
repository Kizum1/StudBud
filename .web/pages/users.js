import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <TableContainer sx={{"bg": "#F7FAFC ", "border": "1px solid #ddd", "borderRadius": "25px"}}>
  <Table>
  <Thead>
  <Tr>
  <Th>
  {`Name`}
</Th>
  <Th>
  {`Email`}
</Th>
  <Th>
  {`Age`}
</Th>
  <Th>
  {`Gender`}
</Th>
  <Th>
  {`School`}
</Th>
  <Th>
  {`Major`}
</Th>
</Tr>
</Thead>
  <Tbody>
  {state.get_users.map((tldpvchc, i) => (
  <Tr key={i}>
  <Td>
  {tldpvchc.name}
</Td>
  <Td>
  {tldpvchc.email}
</Td>
  <Td>
  {tldpvchc.age}
</Td>
  <Td>
  {tldpvchc.gender}
</Td>
  <Td>
  {tldpvchc.school}
</Td>
  <Td>
  {tldpvchc.major}
</Td>
</Tr>
))}
</Tbody>
</Table>
</TableContainer>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
