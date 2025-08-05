import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../features/api/apiSlice';
import { setCredentials } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const { name, email, password, confirmPassword, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match 😢');
    } else {
      try {
        const res = await register({ name, email, password, role }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        console.error('Failed to register: ', err);
        alert(err.data?.message || 'Failed to register 😵');
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="hero min-h-screen bg-gradient-to-tr from-pink-200 via-yellow-100 to-blue-200">
      <div className="hero-content flex-col lg:flex-row-reverse animate__animated animate__fadeIn">
        <div className="text-center lg:text-left lg:pl-10 max-w-md">
          <h1 className="text-6xl font-extrabold text-purple-700 drop-shadow cartoon-font">🎓 Join Tutorverse!</h1>
          <p className="py-6 text-lg text-gray-700 font-semibold">
            🌈 Connect, learn, and power up your brain like a Cartoon Network hero!
            This isn’t just school... it’s *tutor-tainment*! 🎉📚
          </p>
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-white bg-opacity-90 border-4 border-dashed border-indigo-300 rounded-2xl">
          <form className="card-body space-y-4" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label"><span className="label-text text-base font-bold text-pink-700">Name 💫</span></label>
              <input type="text" placeholder="Dexter? Dee Dee?" name="name" value={name} onChange={onChange} className="input input-bordered input-primary bg-yellow-50" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-base font-bold text-blue-700">Email 📧</span></label>
              <input type="email" placeholder="toon@network.com" name="email" value={email} onChange={onChange} className="input input-bordered input-accent bg-blue-50" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-base font-bold text-green-700">Password 🔐</span></label>
              <input type="password" placeholder="******" name="password" value={password} onChange={onChange} className="input input-bordered bg-green-50" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text text-base font-bold text-orange-700">Confirm Password 🔑</span></label>
              <input type="password" placeholder="******" name="confirmPassword" value={confirmPassword} onChange={onChange} className="input input-bordered bg-orange-50" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold text-purple-600">I am a... 🧑‍🏫</span></label>
              <select name="role" value={role} onChange={onChange} className="select select-bordered select-info w-full bg-pink-100">
                <option value="student">🧒 Student</option>
                <option value="parent">👨‍👩‍👧 Parent</option>
                <option value="teacher">👩‍🏫 Teacher</option>
              </select>
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none hover:scale-105 transition-all">
                🌟 Register Now!
              </button>
            </div>
            <label className="label mt-2 text-sm text-center">
              <Link to="/login" className="text-blue-600 hover:underline hover:text-pink-600 transition-all">
                Already have an account? Let’s login! 🚀
              </Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
