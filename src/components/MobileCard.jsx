import {
    Box,
    Card,
    CardBody,
    HStack,
    Image,
    Link,
    ListItem,
    Spacer,
    Text,
    UnorderedList,
    useMediaQuery
} from '@chakra-ui/react'
import React from 'react'
import { FaStar } from "react-icons/fa";
import mobileImg from "../img/mobile.jpg"
import mobileImgCropped from "../img/mobile_cropped.jpg"

export default function MobileCard({ mobile }) {
    //hooks
    const [isSmallerThan680] = useMediaQuery('(max-width: 680px)');

    return (
        <Card>
            <CardBody>
                <HStack gap={isSmallerThan680 ? 5 : 0} pr="10">
                    <Image
                        alignSelf="start"
                        src={isSmallerThan680 ? mobileImgCropped : mobileImg}
                        maxW={isSmallerThan680 ? "80px" : "200px"}
                    />
                    <Box alignSelf="start">
                        <Link target='_blank' href={`/home/${mobile._id}`} fontWeight="bold">{mobile.name} ({mobile.type}, {mobile.memory})</Link>
                        <HStack fontSize="12px">
                            {!isSmallerThan680 && <Text px="2" py="1" bg="green" color="white" borderRadius="5px" fontWeight="bold">
                                4.4 <FaStar style={{ display: "inline-block" }} />
                            </Text>}
                            <Text color="gray" fontWeight="bold">2948 Ratings & 284 Reviews</Text>
                        </HStack>
                        {!isSmallerThan680 && <UnorderedList mt="5">
                            <ListItem>Operating System: {mobile.os}</ListItem>
                            <ListItem>Processor: {mobile.processor}</ListItem>
                            <ListItem>Phone brand: {mobile.brand} {mobile.type}</ListItem>
                            <ListItem>{mobile.memory}</ListItem>
                        </UnorderedList>}
                        {isSmallerThan680 && <Box alignSelf="start" mt={isSmallerThan680 ? "1" : "3"}>
                            <Text fontWeight="bold" fontSize={"1.5rem"}>$ {mobile.price}</Text>
                            <Text fontSize={isSmallerThan680 ? "sm" : "md"}>Free delivery by <b>1st Jan, 24</b></Text>
                            <Text fontSize={isSmallerThan680 ? "sm" : "md"}>Bought 20,000+ times</Text>
                            <Text fontSize={isSmallerThan680 ? "sm" : "md"} color="green" fontWeight="bold">Bank Offer</Text>
                        </Box>}
                    </Box>
                    {!isSmallerThan680 && <Spacer />}
                    {!isSmallerThan680 && <Box alignSelf="start">
                        <Text fontWeight="bold" fontSize="1.5rem">$ {mobile.price}</Text>
                        <Text>Free delivery by <b>1st Jan, 24</b></Text>
                        <Text>Bought 20,000+ times</Text>
                        <Text color="green" fontWeight="bold">Bank Offer</Text>
                    </Box>}
                </HStack>
            </CardBody>
        </Card>
    )
}
