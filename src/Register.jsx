import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'
import { useState } from 'react'
import origin from '../config/origin.json'

const Register = () => {
  const [error, setError] = useState('');
  const [image, setImage] = useState();
  const [text, setText] = useState('Sign up');
  const navigate = useNavigate();
  const upload = async () => {
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const pwd = document.getElementById('pwd');
    const input = document.getElementById('input');
    if (username && email && pwd && input) {
      try {
        setText(<a id="roll1"></a>);
        const DATA = {
          'username': username.value,
          'email': email.value,
          'password': pwd.value,
          'image': image
        }
        const url = origin.default.origin + '/register';
        const response = await axios.post(url, DATA,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
	if(response.status === 200){
		localStorage.setItem('accessToken', response.data.token.accessToken);
		localStorage.setItem('refreshToken', response.data.token?.refreshToken);
	        navigate('/homepage', { replace: true, state: { fromRoute: true } });
	        setError('');
	}

      } catch (err) {
        console.log(err);
        const data = err.response.data;
        setError(data.message);
        setText('Sign up');
      }
    } else {
      setError('An Error occured')
    }
  }
  const handleImage = async (e) => {
    const data = e.target.files[0] ? await imagebase64(e.target.files[0]) : await imagebase64("image.JPG");
    setImage(data)
  }
  const imagebase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data
  }
  return (
    <div className="flex flex-col justify-center md:p-[30px] p-[0px] rounded-[10px] align-center w-[80%] md:w-[50%] lg:w-[40%] bg-black md:bg-[var(--primary-color)] gap-[20px] my-[40px]">
      <header className="flex justify-start text-start w-[100%]">
        <h1 className="text-[1.5em] md:text-[2.4em] text-[var(--secondary-color)] font-extrabold">Welcome to Melodia</h1>
      </header>
      <main className="w-[100%] flex flex-col justify-start gap-[10px]">
        <div className="flex justify-center items-center flex-col">
          <input type="file" onChange={handleImage} maxLength={3145728} accept="image/jpeg, image/png, image/jpg" id="input" className="hidden" />
          <div className=" rounded-[100%] flex justify-center align-center items-center bg-[var(--primary-color)] md:bg-[#090909] text-black w-[200px] h-[200px]">
            {image ? <img src={image} className="w-[200px] h-[200px] rounded-[100%]  cursor-pointer" onClick={() => document.getElementById('input').click()} /> : <FaUser className=" rounded-[100%] flex justify-center align-center items-center bg-[var(--primary-color)] md:bg-[#090909] text-black text-[12em] pt-[10px] cursor-pointer" onClick={() => document.getElementById('input').click()} />}
          </div>
          <label htmlFor="input" className="underline text-[1.1em] cursor-pointer">Add Photo</label>
        </div>
        <p className="text-[1.1em] font-bold">Email</p>
        <input className="input" type="email" id="email" placeholder="Email" />
        <p className="text-[1.1em] font-bold">Username</p>
        <input className="input" type="text" id="username" placeholder="Username" />
        <p className="text-[1.1em] font-bold">Password</p>
        <input className="input" type="password" id="pwd" placeholder="Password" />
        <p className={error === '' ? "hidden" : "text-[0.8em] font-bold text-red-500"}>{error}</p>
        <button onClick={upload} className="mt-[20px] w-[88%] mx-auto hover:cursor-pointer justify-center text-center text-bold flex text-black bg-[var(--secondary-color)] border-0 py-2 px-6 focus:outline-none rounded-full text-lg font-extrabold" id="submit">
          {text}
        </button>
      </main>
      <footer className="mt-[20px] flex flex-col gap-[20px] align-center justify-center text-center w-[100%]">
        <p className="text-[var(--text-primary-color)] font-bold hover:cursor-pointer">Already have an account?</p>
        <Link to="/" className="underline hover:cursor-pointer">Sign in to Melodia</Link>
      </footer>
    </div>
  )
}

export default Register
