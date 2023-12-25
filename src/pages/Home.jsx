import {
    Box,
    Button,
    Card,
    CardBody,
    HStack,
    Heading,
    Input,
    SimpleGrid,
    Spinner,
    Text,
    useDisclosure,
    useMediaQuery
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { get_all_mobiles, get_options, search_mobile } from '../api/apiRequests';
import MobileCard from '../components/MobileCard';
import Filters from '../components/Filters';
import { IoIosFunnel } from "react-icons/io";
import Drawer from '../components/Drawer';
import { useLocation } from 'react-router-dom';


export default function Home() {
    //hooks
    const user = useSelector(state => state.userAuth.user);
    const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const location = useLocation();

    //state variables
    const [mobiles, setMobiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);
    const [options, setOptions] = useState({});
    const [mobileName, setMobileName] = useState("");
    const [searchParams, setSearchParams] = useState(location.search);

    //functions
    useEffect(() => {
        console.log(location.search);
        setLoading(true);
        get_all_mobiles(user.token, searchParams)
            .then(result => {
                result = result.data;
                console.log(result);
                setMobiles(result.data)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [searchParams])

    useEffect(() => {
        setFilterLoading(false);
        get_options(user.token)
            .then(result => {
                result = result.data;
                console.log(result);
                setOptions(result.data)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setFilterLoading(true);
            })
    }, [])

    const handleMobileNameChange = (e) => {
        setMobileName(e.target.value);

        if(e.target.value){
            setLoading(true);
            search_mobile(e.target.value, user.token)
                .then((result) => {
                    result = result.data;
                    console.log(result);
                    setMobiles(result.data)
                })
                .catch(error => {
                    console.log(e);
                })
                .finally(() => {
                    setLoading(false);
                })
        } else {
            setLoading(true);
            get_all_mobiles(user.token)
                .then(result => {
                    result = result.data;
                    console.log(result);
                    setMobiles(result.data)
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }

    return (
        <Box>
            <Navbar />
            {isSmallerThan1200 && <Box px="5" pt="5">
                <Button ref={btnRef} onClick={onOpen} rightIcon={<IoIosFunnel />}>
                    Filters
                </Button>
            </Box>}
            <HStack gap="4">
                {
                    !isSmallerThan1200 ? <Filters onClose={onClose} setSearchParams={setSearchParams} heading={true} card={true} pl="5" py="5" width="25%" /> : <Drawer isOpen={isOpen} onClose={onClose} btnRef={btnRef}>
                        <Filters onClose={onClose} setSearchParams={setSearchParams} heading={false} card={false} pl="0" py="0" width="100%" />
                    </Drawer>
                }
                <Box py="5" pr="5" mb="10" pl={isSmallerThan1200 ? "5" : "0"} width="100%" alignSelf="start">
                    <Box mb="5">
                        <Input
                            value={mobileName}
                            onChange={e => handleMobileNameChange(e)}
                            placeholder='Search for mobiles'
                        />
                    </Box>
                    {loading ? <Box textAlign="center">
                        <Spinner size="xl" />
                    </Box> : <SimpleGrid gap="3" columns={[1]}>
                        {
                            mobiles?.map((mobile, idx) => {
                                return <MobileCard mobile={mobile} key={idx} />
                            })
                        }
                    </SimpleGrid>}
                </Box>
            </HStack>
        </Box>
    )
}
