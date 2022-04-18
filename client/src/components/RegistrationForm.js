import React, { useEffect } from 'react'
import { Input, FormControl, Button, Image } from "@vechaiui/react"
function RegistrationForm({ showPassword, handleToggleShowPassword, regFormData, regFormErr, handleChangeForBothLoginAndRegForm, submitBothLoginAndRegistrationForm, isLoading, DbErrors }) {
    useEffect(() => {
        if (DbErrors.status === 400) {
            alert(DbErrors.message)
        }
    }, [DbErrors]);
    return (
        <div className="form-container sign-up-container">
            <form>
                <h1 className='hello-tailwind'>Sign Up</h1>
                <FormControl invalid={regFormErr.name && true}>
                    <Input
                        type="text" name="name" placeholder="Enter your username." autoComplete='off'
                        value={regFormData.name}
                        onChange={handleChangeForBothLoginAndRegForm} />
                </FormControl>
                <FormControl invalid={regFormErr.email && true}>
                    <Input
                        type="text" name="email" placeholder="jon@gmail.com" autoComplete='off'
                        value={regFormData.email}
                        onChange={handleChangeForBothLoginAndRegForm}
                    />
                </FormControl>
                <FormControl invalid={regFormErr.password && true}>
                    <Input.Group>
                        <Input
                            className="pr-16"
                            placeholder="Enter password"
                            name='password'
                            autoComplete='off'
                            type={showPassword ? "text" : "password"}
                            value={regFormData.password}
                            onChange={handleChangeForBothLoginAndRegForm}
                        />
                        <Input.RightElement className="w-16" style={{ top: "7px", right: "7px" }}>
                            <Button type="button" size="xs" variant="solid" onClick={handleToggleShowPassword}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </Input.RightElement>
                    </Input.Group>
                </FormControl>
                <div className="imageUpload">
                    <Image
                        alt="bruce wayne"
                        htmlWidth={100}
                        htmlHeight={50}
                        className="object-cover"
                        src={regFormData.profileImage}
                    />
                    <FormControl invalid={regFormErr.password && true}>
                        <Input.Group>
                            <label className="custom-file-upload">
                                <Input type="file" name='profileImage' onChange={handleChangeForBothLoginAndRegForm} />
                                Upload your profile image
                            </label>
                        </Input.Group>
                    </FormControl>
                </div>
                <button onClick={submitBothLoginAndRegistrationForm} disabled={isLoading}>{isLoading ? "Loading..." : "Sign Up"}</button>
            </form>
        </div>
    )
}

export default RegistrationForm