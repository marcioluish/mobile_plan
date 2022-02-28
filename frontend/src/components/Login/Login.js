import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const inputReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 0 };
    }

    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 0 };
    }

    return { value: '', isValid: false };
};

const Login = (props) => {
    const authCtx = useContext(AuthContext);

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const [formIsValid, setFormIsValid] = useState(false);

    const [usernameState, dispatchUsername] = useReducer(inputReducer, {
        value: '',
        isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(inputReducer, {
        value: '',
        isValid: null,
    });

    const { isValid: usernameIsValid } = usernameState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const waitUserInputForValidation = setTimeout(() => {
            setFormIsValid(usernameIsValid && passwordIsValid);
        }, 500);

        return () => {
            clearTimeout(waitUserInputForValidation);
        };
    }, [usernameIsValid, passwordIsValid]);

    // Username handling
    const usernameChangeHandler = (event) => {
        dispatchUsername({ type: 'USER_INPUT', val: event.target.value });

        setFormIsValid(
            event.target.value.trim().length > 0 && passwordState.isValid
        );
    };

    const validateUsernameHandler = () => {
        dispatchUsername({ type: 'INPUT_BLUR' });
    };

    // Password handling
    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

        setFormIsValid(
            usernameState.isValid && event.target.value.trim().length > 0
        );
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(usernameState.value, passwordState.value);
        } else if (!usernameIsValid) {
            usernameInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={usernameInputRef}
                    id="username"
                    label="Username"
                    type="text"
                    isValid={usernameIsValid}
                    value={usernameState.value}
                    onChange={usernameChangeHandler}
                    onBlur={validateUsernameHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
