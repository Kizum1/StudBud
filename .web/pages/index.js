import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Button, Center, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
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
  <Center sx={{"padding": "1em"}}>
  <VStack>
  <Heading>
  {`StudBud Users`}
</Heading>
  <Button onClick={(_e) => addEvents([Event("state.add_user_page", {})], (_e))} sx={{"bg": "blue", "color": "white"}}>
  {`Add User`}
</Button>
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
  <Th>
  {`Delete`}
</Th>
</Tr>
</Thead>
  <Tbody>
  {state.get_users.map((oljfspsn, i) => (
  <Tr key={i}>
  <Td>
  {oljfspsn.name}
</Td>
  <Td>
  {oljfspsn.email}
</Td>
  <Td>
  {oljfspsn.age}
</Td>
  <Td>
  {oljfspsn.gender}
</Td>
  <Td>
  {oljfspsn.school}
</Td>
  <Td>
  {oljfspsn.major}
</Td>
  <Td>
  <Button onClick={(_e) => addEvents([Event("state.delete_user", {email:oljfspsn})], (_e))} sx={{"bg": "red", "color": "white"}}>
  {`Delete`}
</Button>
</Td>
</Tr>
))}
</Tbody>
</Table>
</TableContainer>
</VStack>
</Center>
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
