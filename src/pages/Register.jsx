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
    Link,
    Text
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { register } from '../api/apiRequests';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    // State variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Loader states
    const [loading, setLoading] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Password and Confirm Password do not match.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const payload = {
            firstName,
            lastName,
            email,
            password,
        };

        setLoading(true);
        register(payload)
            .then((result) => {
                result = result.data;
                console.log(result);
                navigate("/login");
                toast({
                    title: 'Success',
                    description: 'Successfully registered.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <VStack spacing={4} align="center">
                <Heading mb={8}>Register</Heading>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Box width="300px">
                        <Input
                            type="text"
                            placeholder="First Name"
                            mb={4}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Last Name"
                            mb={4}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
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
                                mb={4}
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
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            mb={6}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" colorScheme="teal" size="lg" width="100%">
                            {loading ? <Spinner /> : "Register"}
                        </Button>

                        <Text mt="2">Already have an account? <Link href="/login" color="teal">Login</Link></Text>
                    </Box>
                </form>
            </VStack>
        </Box>
    );
};

export default Register;
