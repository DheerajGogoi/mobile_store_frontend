import {
    Box,
    Button,
    Container,
    HStack,
    Image,
    Text,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Stack,
    UnorderedList,
    ListItem,
    useMediaQuery,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams, useParams } from 'react-router-dom'
import { get_mobile } from '../api/apiRequests';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import mobileImg from "../img/mobile.jpg"
import mobileImgCropped from "../img/mobile_cropped.jpg"
import { FaStar, FaTag } from 'react-icons/fa';


export default function ViewMobile() {
    //hooks
    const user = useSelector(state => state.userAuth.user);
    const params = useParams();
    const [isSmallerThan1030] = useMediaQuery('(max-width: 1030px)');
    const [isSmallerThan780] = useMediaQuery('(max-width: 780px)');

    //state variable
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState(null);

    useEffect(() => {
        console.log(params.mobileId);

        setLoading(true);
        get_mobile(params.mobileId, user.token)
            .then(result => {
                result = result.data;
                console.log(result);
                setMobile(result.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
            
    }, [])

    return (
        <Box>
            <Navbar />
            <Container maxW='1400' padding="5">
                {isSmallerThan780 && <Breadcrumb fontSize="sm" color="gray" mb="5">
                    <BreadcrumbItem>
                        <BreadcrumbLink href='/home'>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>{mobile?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>}
                <HStack gap="5">
                    {!isSmallerThan1030 && <Box alignSelf="start">
                        <Stack>
                            <Box
                                border="1px solid #e4e7ed"
                                p="5"
                                _hover={{ borderColor: "orange", cursor: "pointer" }}
                            >
                                <Image
                                    src={mobileImg}
                                    maxW="50px"
                                />
                            </Box>
                            <Box
                                border="1px solid #e4e7ed"
                                p="5"
                                 _hover={{ borderColor: "orange", cursor: "pointer" }}
                            >
                                <Image
                                    src={mobileImg}
                                    maxW="50px"
                                />
                            </Box>
                            <Box
                                border="1px solid #e4e7ed"
                                p="5"
                                 _hover={{ borderColor: "orange", cursor: "pointer" }}
                            >
                                <Image
                                    src={mobileImg}
                                    maxW="50px"
                                />
                            </Box>
                            <Box
                                border="1px solid #e4e7ed"
                                p="5"
                                 _hover={{ borderColor: "orange", cursor: "pointer" }}
                            >
                                <Image
                                    src={mobileImg}
                                    maxW="50px"
                                />
                            </Box>
                        </Stack>
                    </Box>}
                    <Box alignSelf="start">
                        <Box
                            border="1px solid #e4e7ed"
                            p="5"
                        >
                            <Image
                                src={mobileImg}
                                width={isSmallerThan780 ? "100%" : "400px"}
                            />
                        </Box>
                        {isSmallerThan1030 && <Box mt="3">
                            <Stack flexDirection="row">
                                <Box
                                    w="100%"
                                    border="1px solid #e4e7ed"
                                    p="5"
                                    _hover={{ borderColor: "orange", cursor: "pointer" }}
                                >
                                    <Image
                                        src={mobileImgCropped}
                                        maxW="30px"
                                    />
                                </Box>
                                <Box
                                    w="100%"
                                    border="1px solid #e4e7ed"
                                    p="5"
                                    _hover={{ borderColor: "orange", cursor: "pointer" }}
                                >
                                    <Image
                                        src={mobileImgCropped}
                                        maxW="30px"
                                    />
                                </Box>
                                <Box
                                    w="100%"
                                    border="1px solid #e4e7ed"
                                    p="5"
                                    _hover={{ borderColor: "orange", cursor: "pointer" }}
                                >
                                    <Image
                                        src={mobileImgCropped}
                                        maxW="30px"
                                    />
                                </Box>
                                <Box
                                    w="100%"
                                    border="1px solid #e4e7ed"
                                    p="5"
                                    _hover={{ borderColor: "orange", cursor: "pointer" }}
                                >
                                    <Image
                                        src={mobileImgCropped}
                                        maxW="30px"
                                    />
                                </Box>
                            </Stack>
                        </Box>}
                        <HStack mt="3" gap="2">
                            <Button p="8" w="100%" colorScheme='orange' bg="#ff9f00" color="white" borderRadius={0}>ADD TO CART</Button>
                            <Button p="8" w="100%" colorScheme='orange' bg="#fb641b" color="white" borderRadius={0}>BUY NOW</Button>
                        </HStack>

                        {isSmallerThan780 && <Box mt="5">
                            <Text fontSize="1.2rem">{mobile?.brand} - {mobile?.name} ({mobile?.type}, {mobile?.memory})</Text>
                            <HStack>
                                <Text fontSize="12px" px="2" py="1" bg="green" color="white" borderRadius="5px" fontWeight="bold">
                                    4.4 <FaStar style={{ display: "inline-block" }} />
                                </Text>
                                <Text color="gray">2948 Ratings & 284 Reviews</Text>
                            </HStack>
                            <Stack mt="5" gap="0">
                                <Text color="green">Extra $50 off</Text>
                                <Text fontSize="2rem" fontWeight="bold">$ {mobile?.price}</Text>
                                <Text fontSize="small">+ $2 secured Packaging Fee</Text>
                            </Stack>
                            <Box mt="5">
                                <Text fontWeight="bold">Available Offers</Text>
                                <Stack mt="2">
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>Bank Offer 5% Cashback on Axis Bank Card</Text>
                                    </HStack>
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>Special Price Get extra $55 off (price inclusive of cashback/coupon)</Text>
                                    </HStack>
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>Buy this product and Get Extra $2 Off on Select Room Heaters</Text>
                                    </HStack>
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>No cost EMI $23/month. Standard EMI also available</Text>
                                    </HStack>
                                </Stack>
                            </Box>
                            <Box mt="5">
                                <Text fontWeight="bold">Highlights</Text>
                                <UnorderedList mt="2">
                                    <ListItem>4 GB RAM | {mobile?.memory} ROM | Expandable Upto 1 TB</ListItem>
                                    <ListItem>16.56 cm (6.52 inch) HD+ Display</ListItem>
                                    <ListItem>8MP Dual Rear Camera | 5MP Front Camera</ListItem>
                                    <ListItem>5000 mAh Battery</ListItem>
                                    <ListItem>{mobile?.processor} Processor</ListItem>
                                </UnorderedList>
                            </Box>
                        </Box>}
                    </Box>
                    {!isSmallerThan780 && <Box p="2" alignSelf="start">
                        <Box>
                            <Breadcrumb fontSize="sm" color="gray" mb="5">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='/home'>Home</BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbItem isCurrentPage>
                                    <BreadcrumbLink href='#'>{mobile?.name}</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <Text fontSize="1.2rem">{mobile?.brand} - {mobile?.name} ({mobile?.type}, {mobile?.memory})</Text>
                            <HStack>
                                <Text fontSize="12px" px="2" py="1" bg="green" color="white" borderRadius="5px" fontWeight="bold">
                                    4.4 <FaStar style={{ display: "inline-block" }} />
                                </Text>
                                <Text color="gray">2948 Ratings & 284 Reviews</Text>
                            </HStack>
                            <Stack mt="5" gap="0">
                                <Text color="green">Extra $50 off</Text>
                                <Text fontSize="2rem" fontWeight="bold">$ {mobile?.price}</Text>
                                <Text fontSize="small">+ $2 secured Packaging Fee</Text>
                            </Stack>
                            <Box mt="5">
                                <Text fontWeight="bold">Available Offers</Text>
                                <Stack mt="2">
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>Bank Offer 5% Cashback on Axis Bank Card</Text>
                                    </HStack>
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>Special Price Get extra $55 off (price inclusive of cashback/coupon)</Text>
                                    </HStack>
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>Buy this product and Get Extra $2 Off on Select Room Heaters</Text>
                                    </HStack>
                                    <HStack>
                                        <FaTag color="green" />
                                        <Text>No cost EMI $23/month. Standard EMI also available</Text>
                                    </HStack>
                                </Stack>
                            </Box>
                            <Box mt="5">
                                <Text fontWeight="bold">Highlights</Text>
                                <UnorderedList mt="2">
                                    <ListItem>4 GB RAM | {mobile?.memory} ROM | Expandable Upto 1 TB</ListItem>
                                    <ListItem>16.56 cm (6.52 inch) HD+ Display</ListItem>
                                    <ListItem>8MP Dual Rear Camera | 5MP Front Camera</ListItem>
                                    <ListItem>5000 mAh Battery</ListItem>
                                    <ListItem>{mobile?.processor} Processor</ListItem>
                                </UnorderedList>
                            </Box>
                        </Box>
                    </Box>}
                </HStack>
            </Container>
        </Box>
    )
}
