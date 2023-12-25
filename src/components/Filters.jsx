import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    Checkbox,
    HStack,
    Heading,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react'
import { get_options } from '../api/apiRequests';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Filters({ width, heading, pl, py, card, setSearchParams, onClose }) {
    //hooks
    const user = useSelector(state => state.userAuth.user);
    const navigate = useNavigate();

    //state variables
    const [filterLoading, setFilterLoading] = useState(false);
    const [options, setOptions] = useState({});

    const [brands, setBrands] = useState({});
    const [os, setOs] = useState({});
    const [memory, setMemory] = useState({});
    const [types, setTypes] = useState({});
    const [processors, setProcessors] = useState({});
    
    const handleSearch = () => {
        // console.log(document.getElementById(`operating_systems_Legion OS (Android 11)`));
        let queries = {
            brands: [],
            types: [],
            memory_options: [],
            processors: [],
            operating_systems: []
        }

        for (const attribute in options) {
            if (options.hasOwnProperty(attribute)) {
                const values = options[attribute];
                
                if (Array.isArray(values)) {
                    values.forEach((value, index) => {
                        if(document.getElementById(`${attribute}_${value}`).checked){
                            queries[attribute].push(value);
                        }
                    });
                } else {
                    console.log(`  ${values}`);
                }
            }
        }

        console.log(queries);

        let brand_string = "brands=";
        let type_string = "types=";
        let memory_string = "memoryOptions=";
        let processor_string = "processors=";
        let os_string = "operatingSystems=";

        if(queries.brands.length > 0) brand_string = brand_string.concat(queries.brands.join(','));
        if(queries.types.length > 0) type_string = type_string.concat(queries.types.join(','));
        if(queries.memory_options.length > 0) memory_string = memory_string.concat(queries.memory_options.join(','));
        if(queries.processors.length > 0) processor_string = processor_string.concat(queries.processors.join(','));
        if(queries.operating_systems.length > 0) os_string = os_string.concat(queries.operating_systems.join(','));

        let query_string = [];
        if (brand_string.length > 7) query_string.push(brand_string);
        if (type_string.length > 6) query_string.push(type_string)
        if (memory_string.length > 14) query_string.push(memory_string)
        if (processor_string.length > 11) query_string.push(processor_string)
        if (os_string.length > 17) query_string.push(os_string)

        navigate(`/home?${query_string.join("&")}`);
        setSearchParams(`?${query_string.join("&")}`);
        onClose();
    };

    //functions
    useEffect(() => {
        setFilterLoading(true);
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
                setFilterLoading(false);
            })
    }, [])

    const clearFilters = () => {
        navigate("/home");
        setSearchParams(``);
        onClose();

        for (const attribute in options) {
            if (options.hasOwnProperty(attribute)) {
                const values = options[attribute];
                
                if (Array.isArray(values)) {
                    values.forEach((value, index) => {
                        document.getElementById(`${attribute}_${value}`).checked = false;
                    });
                } else {
                    console.log(`  ${values}`);
                }
            }
        }
    }

    return (
        <Box pl={pl} py={py} alignSelf="start" width={width}>
            {filterLoading ? <Spinner /> : <Card boxShadow={card}>
                <CardBody>
                    {heading && <Text fontWeight="bold" mb="5">Add Filters</Text>}

                    <Box mb="5">
                        <Text fontWeight="bold" mb="2">Select Brand</Text>
                        <Box>
                            <Stack>
                                <SimpleGrid columns={[2]}>
                                    {
                                        options?.brands?.map((brand, idx) => {
                                            return (
                                                <Checkbox
                                                    key={idx}
                                                    id={`brands_${brand}`}
                                                >
                                                    {brand}
                                                </Checkbox>
                                            )
                                        })
                                    }
                                </SimpleGrid>
                            </Stack>
                        </Box>
                    </Box>
                    <Box mb="5">
                        <Text fontWeight="bold" mb="2">Select Storage</Text>
                        <Box>
                            <Stack>
                                <SimpleGrid columns={[2]}>
                                {
                                    options?.memory_options?.map((memory, idx) => {
                                        return (
                                            <Checkbox
                                                key={idx}
                                                id={`memory_options_${memory}`}
                                            >
                                                {memory}
                                            </Checkbox>
                                        )
                                    })
                                }
                                </SimpleGrid>
                            </Stack>
                        </Box>
                    </Box>
                    <Box mb="5">
                        <Text fontWeight="bold" mb="2">Select Processor</Text>
                        <Box>
                            <Stack gap="1">
                            {
                                options?.processors?.map((processor, idx) => {
                                    return (
                                        <Checkbox
                                            key={idx}
                                            id={`processors_${processor}`}
                                        >
                                            {processor}
                                        </Checkbox>
                                    )
                                })
                            }
                            </Stack>
                        </Box>
                    </Box>
                    <Box mb="5">
                        <Text fontWeight="bold" mb="2">Select Operating System</Text>
                        <Box>
                            <Stack gap="1">
                            {
                                options?.operating_systems?.map((os, idx) => {
                                    return (
                                        <Checkbox
                                            key={idx}
                                            id={`operating_systems_${os}`}
                                        >
                                            {os}
                                        </Checkbox>
                                    )
                                })
                            }
                            </Stack>
                        </Box>
                    </Box>
                    <Box mb="5">
                        <Text fontWeight="bold" mb="2">Select Types</Text>
                        <Box>
                            <Stack gap="1">
                            {
                                options?.types?.map((type, idx) => {
                                    return (
                                        <Checkbox
                                            key={idx}
                                            id={`types_${type}`}
                                        >
                                            {type}
                                        </Checkbox>
                                    )
                                })
                            }
                            </Stack>
                        </Box>
                    </Box>

                    <Button colorScheme="facebook" w="100%" onClick={handleSearch}>Search</Button>
                    <Button w="100%" mt="3" onClick={clearFilters}>Clear Filters</Button>
                </CardBody>
            </Card>}
        </Box>
    )
}
