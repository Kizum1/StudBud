import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Code, Flex, Heading, HStack, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import { HamburgerIcon } from "@chakra-ui/icons"
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
  <Flex sx={{"alignItems": "center", "transition": "left 0.5s, width 0.5s"}}>
  <Flex sx={{"position": "fixed", "width": "100%", "top": "0px", "zIndex": "5"}}>
  <HStack sx={{"padding": "1em"}}>
  <Text sx={{"padding": "0 8px", "fontWeight": "bold", "fontSize": "2em", "border": "1px solid #F4F3F6", "borderRadius": "0.375rem", "backgroundColor": "#F4F3F6", "_hover": {}}}>
  {`StudBud`}
</Text>
</HStack>
  <Flex align={`center`}>
  <Link as={``}>
  <Flex align={`center`} justify={`center`} sx={{"bg": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#F5EFFE` : `white`, "color": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Flex sx={{"paddingRight": "6px"}}>
  <Text>
  {`Home`}
</Text>
</Flex>
</Flex>
  <Flex sx={{"href": "/", "width": "12%"}}/>
</Link>
  <Link as={``}>
  <Flex align={`center`} justify={`center`} sx={{"bg": isTrue((state.router.page.path === "/dashboard") || (((state.router.page.path === "/") && "Dashboard") === "Home")) ? `#F5EFFE` : `white`, "color": isTrue((state.router.page.path === "/dashboard") || (((state.router.page.path === "/") && "Dashboard") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Flex sx={{"paddingRight": "6px"}}>
  <Text>
  {`Dashboard`}
</Text>
</Flex>
</Flex>
  <Flex sx={{"href": "/dashboard", "width": "12%"}}/>
</Link>
  <Link as={``}>
  <Flex align={`center`} justify={`center`} sx={{"bg": isTrue((state.router.page.path === "/settings") || (((state.router.page.path === "/") && "Settings") === "Home")) ? `#F5EFFE` : `white`, "color": isTrue((state.router.page.path === "/settings") || (((state.router.page.path === "/") && "Settings") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Flex sx={{"paddingRight": "6px"}}>
  <Text>
  {`Settings`}
</Text>
</Flex>
</Flex>
  <Flex sx={{"href": "/settings", "width": "12%"}}/>
</Link>
</Flex>
</Flex>
  <Box sx={{"paddingTop": "5em", "paddingX": ["auto", "2em"]}}>
  <Box sx={{"width": "100%", "alignItems": "flex-start", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "borderRadius": "0.375rem", "padding": "1em", "marginBottom": "2em"}}>
  <VStack>
  <Heading sx={{"fontSize": "3em"}}>
  {`Settings`}
</Heading>
  <Text>
  {`Welcome to Reflex!`}
</Text>
  <Text>
  {`You can edit this page in `}
  <Code>
  {`{your_app}/pages/settings.py`}
</Code>
</Text>
</VStack>
</Box>
</Box>
  <Spacer/>
  <Box sx={{"position": "fixed", "right": "1.5em", "top": "1.5em", "zIndex": "500"}}>
  <Menu>
  <MenuButton sx={{"width": "3em", "height": "3em", "backgroundColor": "white", "border": "1px solid #F4F3F6", "borderRadius": "0.375rem"}}>
  <HamburgerIcon sx={{"size": "4em", "color": "black"}}/>
</MenuButton>
  <MenuList>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  {`Home`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/dashboard`} sx={{"width": "100%"}}>
  {`Dashboard`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/settings`} sx={{"width": "100%"}}>
  {`Settings`}
</Link>
</MenuItem>
  <MenuDivider/>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`https://github.com/reflex-dev`} sx={{"width": "100%"}}>
  {`About`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`mailto:founders@=reflex.dev`} sx={{"width": "100%"}}>
  {`Contact`}
</Link>
</MenuItem>
</MenuList>
</Menu>
</Box>
</Flex>
  <NextHead>
  <title>
  {`Settings`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
