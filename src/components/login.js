import React, {  Component} from 'react';
import showPwdImg from '../img/show.svg';
import hidePwdImg from '../img/hide.svg';


class Login extends Component {
    state = {
        userName: '',
        password: '',
        loc:'',
        setIsRevealPwd: true,
        rememberMe: false
      };

    componentDidMount() {
        //Setup remember me if it's checked
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const userName = rememberMe ? localStorage.getItem('userName') : '';
        const password = rememberMe ? localStorage.getItem('password') : '';

        this.setState({ userName, password, rememberMe });
    }

    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
    
        this.setState({ [input.name]: value });
    };

    handleChangePassword = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        
        this.setState({ [input.name]: value });
    };
    

    render(){
        const handleValidation = (e) => {
            e.preventDefault();
            const { userName, password, rememberMe } = this.state;
            let now = new Date();
            let timeStamp = now.getTime();
            let loc ="https://rec.myrecruitmentplus.com/RequestServlet?rand=" + Math.floor((Math.random())*10000000000) + "&controllerName=RecLogon&timestamp="+timeStamp;
            
            this.setState({ loc });

            localStorage.setItem('rememberMe', rememberMe);
            localStorage.setItem('userName', rememberMe ? userName : '');
            localStorage.setItem('password', rememberMe ? password : '');
            


            //Form validation
            let action = document.getElementById('action');
            let emailInput = document.getElementById('adlogicUsername');
            let passwordInput = document.getElementById('adlogicPassword');
            let emailError = document.getElementById('emailError');
            let passwordError = document.getElementById('passwordError');
            //action.classList.add("full-screen");



            if(emailInput.value === ''){
                emailInput.classList.remove("green-border");
                emailInput.classList.add("error-border");
                emailError.innerHTML = "Field Required";
            }
            else{
                emailInput.classList.remove("error-border");
                emailInput.classList.add("green-border");
                emailError.innerHTML = "";
            }
            if(passwordInput.value === ''){
                passwordInput.classList.remove("green-border");
                passwordInput.classList.add("error-border");
                passwordError.innerHTML = "Field Required";
            }
            else{
                passwordInput.classList.remove("error-border");
                passwordInput.classList.add("green-border");
                passwordError.innerHTML = "";
            }
            if(emailInput.value || passwordInput.value !== ''){
                //Loader for submit button
                let spinner = '<span class="spinner"></span>';
                action.classList.add('loading');
                action.innerHTML = spinner;
                action.classList.remove("bg-red-600");
                action.classList.remove("bg-blue-500");
                action.classList.add("bg-green-500");

            }
            else{
                action.classList.remove("bg-blue-600");
                action.classList.add("bg-red-500");
            }


        };

        return (
            <div className='bg-gray-200 h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className="text-2xl font-bold text-transparent md:text-1xl bg-clip-text bg-gradient-to-r from-blue-500  to-blue-800 mb-10 text-center"> Login to your account</h1>
                    <form id="adlogicLoginForm"  action={this.state.loc} method="POST"  onSubmit={handleValidation}>
                        <div>
                            <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="text"
                                className={`shadow-md w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
                                id="adlogicUsername"
                                name="userName" 
                                value={this.state.userName}
                                placeholder='Your Email'
                                onChange={this.handleChange}
                            />
                             <span className="error" id="emailError"></span>
                        </div>
                        <div>
                            <div className="flex justify-between mt-5">
                                <label htmlFor='password'  className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <a href="#" className="text-xs text-gray-500">Forget Password?</a>
                            </div>
                            <div className="pwd-container">
                            <input
                                type={this.state.setIsRevealPwd ? 'password' : 'text'}
                                name="password"
                                id="adlogicPassword"
                                className={`shadow-md transition-all w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
                                value={this.state.password}
                                placeholder='Your Password'
                                onChange={this.handleChangePassword}
                            />
                            <img
                                alt="show"
                                title={this.state.setIsRevealPwd ? "Show password" : "Hide password"}
                                src={this.state.setIsRevealPwd ? hidePwdImg : showPwdImg}
                                onClick={() => this.setState(prevState =>({ setIsRevealPwd : !prevState.setIsRevealPwd }))}
                            />
                            </div>
                            <span className="error" id="passwordError"></span>
                        </div>
                        <div className="flex justify-between mt-5">
                            <label htmlFor='rememberMe' className="text-sm  d-block">Remember me</label>
                            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} id="toggle" className="transition-all toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <button
                                id="action"
                                className={`ring-2 ring-blue-300 ring-opacity-50 shadow-2xl button transition-all bg-blue-600 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-900`}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
};

export default Login;