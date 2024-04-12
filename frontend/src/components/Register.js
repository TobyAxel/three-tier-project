import './css/register.css';

function Register() {

    return (
        <>
            <main>
                <div className='register-screen'>
                    <div>
                        <div className='register-header'>
                            <div className='register-title'>ProjectPilot</div>
                            <div className='register-title-undertext'>Project handling made easy</div>
                        </div>
                        <form className='register-form'>
                            <div className='register-text'>username: *</div>
                            <input type='text' className='register-input'/>
                            <div className='register-text'>password: *</div>
                            <input type='password' className='register-input'/>                            
                            <div className='register-text'>Email:</div>
                            <input type='text' className='register-input'/>
                            <div className='checkboxes'>
                                <input type='checkbox' className='checkbox'/>I have read and accepted the terms of service *<br></br>
                                <input type='checkbox' className='checkbox'/>I agree to have my data sold to literally anyone
                            </div>
                            <button className='register-button'>SIGN UP</button>
                        </form>
                    </div>

                </div>
                <div className='image'>

                </div>
            </main>
        </>
    )
}

export default Register;