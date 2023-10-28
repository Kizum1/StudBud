import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import "gridjs/dist/theme/mermaid.css"
import { Code, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import { Grid as DataTableGrid } from "gridjs-react"
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
  <VStack>
  <DataTableGrid columns={["Rank", "University"]} data={[[1, "Harvard University"], [2, "Stanford University"], [3, "Massachusetts Institute of Technology"], [4, "California Institute of Technology"], [5, "University of Chicago"], [6, "Princeton University"], [7, "Columbia University"], [8, "Yale University"], [9, "University of Pennsylvania"], [10, "University of California--Berkeley"], [11, "University of California--Los Angeles"], [12, "Duke University"], [13, "University of Michigan--Ann Arbor"], [14, "Johns Hopkins University"], [15, "Northwestern University"], [16, "Cornell University"], [17, "University of California--San Diego"], [18, "University of Washington"], [19, "University of California--San Francisco"], [20, "University of Wisconsin--Madison"], [21, "New York University"], [22, "University of California--Santa Barbara"], [23, "Brown University"], [24, "University of North Carolina--Chapel Hill"], [25, "University of Texas--Austin"], [26, "Washington University in St. Louis"], [27, "University of Illinois--Urbana-Champaign"], [28, "Georgia Institute of Technology"], [29, "University of California--Davis"], [30, "University of Southern California"], [31, "University of California--Irvine"], [32, "University of Florida"], [33, "University of Maryland--College Park"], [34, "University of Virginia"], [35, "Boston University"], [36, "University of Rochester"], [37, "University of Colorado--Boulder"], [38, "University of Notre Dame"], [39, "University of Minnesota--Twin Cities"], [40, "Vanderbilt University"], [41, "Rice University"], [42, "Ohio State University"], [43, "University of Pittsburgh"], [44, "University of Arizona"], [45, "Michigan State University"], [46, "Pennsylvania State University"], [47, "Indiana University--Bloomington"], [48, "University of Utah"], [49, "University of California--Santa Cruz"], [50, "University of Iowa"], [51, "Purdue University--West Lafayette"], [52, "Carnegie Mellon University"], [53, "Emory University"], [54, "University of Illinois--Chicago"], [55, "Case Western Reserve University"], [56, "Dartmouth College"], [57, "Tufts University"], [58, "University of Texas--Dallas"], [59, "Yeshiva University"], [60, "University of Miami"], [61, "University of Missouri--Columbia"], [62, "University of Connecticut"], [63, "Brandeis University"], [64, "Texas A&M University--College Station"], [65, "University of Oregon"], [66, "University of Nebraska--Lincoln"], [67, "Syracuse University"], [68, "University of Georgia"], [69, "University of Massachusetts--Amherst"], [70, "University of Tennessee--Knoxville"], [71, "University of Alabama"], [72, "University of Cincinnati"], [73, "University of South Carolina"], [74, "Georgetown University"], [75, "George Washington University"], [76, "Wake Forest University"], [77, "University of Hawaii--Manoa"], [78, "Virginia Tech"], [79, "University of Kansas"], [80, "University of Oklahoma"], [81, "Rutgers University--New Brunswick"], [82, "Stony Brook University--SUNY"], [83, "University of Delaware"], [84, "University of Kentucky"], [85, "University of Vermont"], [86, "Florida State University"], [87, "University of Texas--Arlington"], [88, "University of Houston"], [89, "Louisiana State University--Baton Rouge"], [90, "Iowa State University"], [91, "University of New Mexico"], [92, "University of Arkansas"], [93, "North Carolina State University"], [94, "University of South Florida"], [95, "Oregon State University"], [96, "University of Rhode Island"], [97, "Temple University"], [98, "University of Alaska--Fairbanks"], [99, "Colorado State University"]]} pagination={true} search={true} sort={true}/>
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
