import React from 'react'
import { Input, FormControl, Button } from "@vechaiui/react"

function LoginForm({ showPassword, handleToggleShowPassword, loginFormData, loginFormErr, handleChangeForBothLoginAndRegForm, submitBothLoginAndRegistrationForm, isLoading }) {
    return (
        <div className="form-container sign-in-container">
            <form>
                <h1>Sign In</h1>
                <FormControl invalid={loginFormErr.name && true}>
                    <Input
                        type="text" name="email" placeholder="Enter your email." autoComplete='off'
                        value={loginFormData.email}
                        onChange={handleChangeForBothLoginAndRegForm} />
                </FormControl>
                <FormControl invalid={loginFormErr.password && true}>
                    <Input.Group>
                        <Input
                            className="pr-16"
                            placeholder="Enter password"
                            name='password'
                            autoComplete='off'
                            type={showPassword ? "text" : "password"}
                            value={loginFormData.password}
                            onChange={handleChangeForBothLoginAndRegForm}
                        />
                        <Input.RightElement className="w-16" style={{ top: "7px", right: "7px" }}>
                            <Button type="button" size="xs" variant="solid" onClick={handleToggleShowPassword}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </Input.RightElement>
                    </Input.Group>
                </FormControl>
                <button onClick={submitBothLoginAndRegistrationForm} disabled={isLoading}>{isLoading ? "Loading..." : "Sign Ip"}</button>
            </form>
        </div>
    )
}

export default LoginForm