import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Box,
    HStack,
    Spacer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Text,
    Avatar,
    Link,
    useMediaQuery,
} from '@chakra-ui/react'
import React from 'react'
import { authActions } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    //hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userAuth.user);
    const [isSmallerThan420] = useMediaQuery('(max-width: 420px)');

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/login")
    }
    return (
        <Box p="5" bg="#2874f0">
            <HStack gap="5">
                <Text fontWeight="bold" color="white" fontSize={isSmallerThan420 ? "sm" : "1.2rem"}>MOBILE STORE</Text>
                <Spacer />
                <Link href="/home" color="white" fontSize={isSmallerThan420 ? "sm" : "md"}>HOME</Link>
                <Menu>
                    <MenuButton as={Button} p="6">
                        <HStack gap="5">
                            <Avatar size="sm" src='https://bit.ly/broken-link' />
                            {!isSmallerThan420 && <Text>{user?.firstName}</Text>}
                        </HStack>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>{user?.firstName} {user?.lastName}</MenuItem>
                        <MenuItem>{user?.email}</MenuItem>
                        <MenuItem fontWeight="bold" onClick={handleLogout}>Log out</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Box>
    )
}
