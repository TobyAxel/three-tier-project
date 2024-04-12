import './css/login.css';

function Login() {

    return (
        <>
            <main>
                <div className='login-screen'>
                    <div>
                        <div className='login-header'>
                            <div className='login-title'>ProjectPilot</div>
                            <div className='login-title-undertext'>Project handling made easy</div>
                        </div>
                        <form className='login-form'>
                            <div className='login-text'>username:</div>
                            <input type='text' className='login-input'/>
                            <div className='login-text'>password: <a className='login-recover-password'>Forgot password?</a></div>
                            <input type='password' className='login-input'/>
                            <div className='login-text'>Don't Have an account? <a className='login-register'>Create one</a></div>
                            <button className='login-button'>LOG IN</button>
                        </form>
                    </div>

                </div>
                <div className='image'>

                </div>
            </main>
        </>
    )
}

export default Login;