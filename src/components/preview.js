import React, {  Component} from 'react';
import showPwdImg from '../img/show.svg';
import hidePwdImg from '../img/hide.svg';


class Preview extends Component {
    state = {
        defaultClass: '',
      };

    componentDidMount() {

    }

    handleChange = (event) => {
        this.setState({defaultClass : event.target.value})
    };

    render(){
        const handleValidation = (e) => {
            e.preventDefault();

            let classInput = document.getElementById('classInput');
            var string = classInput.value;

            this.setState({defaultClass : string})


        };

        return (
            <div className='bg-gray-200 h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className="text-2xl font-bold text-transparent md:text-1xl bg-clip-text bg-gradient-to-r from-blue-500  to-blue-800 mb-10 text-center"> Element Previewer</h1>
                    <form onSubmit={handleValidation}>
                        <div>
                            <input
                                type="text"
                                className={`shadow-md w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
                                id="classInput"
                                placeholder='Add some class'
                                onChange={this.handleChange}
                            />
                             <span className="error" id="emailError"></span>
                        </div>
                        <div className='flex justify-center items-center mt-10'>
                            
                            <button
                                id="action"
                                className={this.state.defaultClass}
                            >
                                Button
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    
};

export default Preview;