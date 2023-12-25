import React, { useState } from 'react';
import {
    Box,
    Heading,
    Input,
    Button,
    VStack,
    IconButton,
    InputGroup,
    InputRightElement,
    Spinner,
    useToast,
    Text,
    Link
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from '../api/apiRequests';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    //hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    //state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    //loader states
    const [loading, setLoadnig] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email,
            password
        }
        console.log('Payload:', payload);

        setLoadnig(true);
        login(payload)
            .then(result => {
                result = result.data;
                console.log(result);
                dispatch(authActions.login({ user: {...result.user, token: result.token} }));
                navigate("/home");
                toast({
                    title: 'Success',
                    description: "Successfully logged in to your account.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLoadnig(false);
            })
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
        <VStack spacing={4} align="center">
            <Heading mb={8}>Login</Heading>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box width="300px">
                    <Input
                        type="email"
                        placeholder="Email"
                        mb={4}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            mb={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <InputRightElement width="4.5rem">
                            <IconButton
                            h="1.75rem"
                            size="sm"
                            onClick={handleTogglePassword}
                            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Button type="submit" colorScheme="teal" size="lg" width="100%">
                        {loading ? <Spinner /> : "Login"}
                    </Button>

                    <Text mt="2">Don't have an account? <Link href="/register" color="teal">Register</Link></Text>
                </Box>
            </form>
        </VStack>
        </Box>
    );
};

export default Login;
