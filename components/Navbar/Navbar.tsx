import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Avatar } from '../Avatar';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeMode } from '../../store/slices/sliceMode';
import { setUserLogged, setUserLoggedOut } from '../../store/slices/sliceUser';
import { NavProps } from './Navbar.interface';
import { Tooltip } from '../Tooltip';
import toast from 'react-hot-toast';

export const Navbar = ({ active }: NavProps) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.mode.mode);
  const userLogged = useAppSelector((state) => state.user.isLogged);
  const [menuState, setMenuState] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.displayName) {
      dispatch(setUserLogged());
    }
  }, [user, dispatch]);

  return (
    <nav
      className={` fixed  z-[999] shadow-md bg-white w-screen h-max  ${
        mode && '!bg-dark-mode'
      }`}
    >
      <div
        className={`flex h-20  w-[95%] mx-auto items-center bg-white justify-between px-2 sm:px-6 md:px-10  ${
          mode && '!bg-dark-mode'
        }`}
      >
        <Link href={'/'}>
          <span
            className={`text-2xl flex items-center  md:space-x-2 font-semibold font-mono text-gray-900 uppercase cursor-pointer ${
              mode && '!text-white'
            }`}
          >
            <p>
              project<span className="text-primary-color">mate</span>
            </p>
          </span>
        </Link>

        <div
          className={`hidden lg:flex justify-around items-center w-[400px] h-full ${
            mode && 'text-white'
          }`}
        >
          <Link href={'/'}>
            <a
              href=""
              className={`text-[20px] h-full ${
                mode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } items-center flex px-2  font-normal ${
                active === 'home' && 'active'
              }`}
            >
              Home
            </a>
          </Link>
          <Link href={'/projects'}>
            <a
              href=""
              className={`text-[20px] ${
                mode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } h-full flex items-center px-2 font-normal ${
                active === 'projects' && 'active'
              }`}
            >
              Projects
            </a>
          </Link>
          <Link href={'/about'}>
            <a
              href="#"
              className={`text-[20px] ${
                mode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } h-full flex items-center px-2 font-normal ${
                active === 'about' && 'active'
              }`}
            >
              About
            </a>
          </Link>
        </div>
        <div className="flex  items-center">
          <div className="flex items-center justify-between w-max">
            <Tooltip content={'Toggle mode'} wrapperTag="div" placement="up">
              <a
                href="#"
                onClick={() => dispatch(changeMode())}
                className={`${
                  mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } p-2 rounded-full flex items-center justify-center `}
              >
                {mode ? (
                  <Image
                    src={'/light-mode.svg'}
                    alt="night-mode"
                    height={30}
                    width={30}
                  />
                ) : (
                  <Image
                    src={'/night-mode.svg'}
                    alt="night-mode"
                    height={27}
                    width={27}
                  />
                )}
              </a>
            </Tooltip>
            <a
              onClick={() => setMenuState(!menuState)}
              className={`${
                mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              } p-2 sm:hidden cursor-pointer rounded-full flex items-center justify-center `}
            >
              {mode ? (
                menuState ? (
                  <Icon
                    icon="akar-icons:cross"
                    color="white"
                    height={30}
                    width={30}
                  />
                ) : (
                  <Icon
                    icon="charm:menu-hamburger"
                    color="white"
                    height={30}
                    width={30}
                  />
                )
              ) : menuState ? (
                <Icon icon="akar-icons:cross" height={30} width={30} />
              ) : (
                <Icon icon="charm:menu-hamburger" height={30} width={30} />
              )}
            </a>
            <Tooltip content={'Github'} wrapperTag="div" placement="up">
              <a
                href="https://github.com/rohitdasu/projectmate"
                target="_blank"
                rel="noreferrer"
                className={`${
                  mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } p-2 hidden rounded-full sm:flex items-center justify-center `}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
                    fill={mode ? 'white' : '#656565'}
                  />
                </svg>
              </a>
            </Tooltip>
            <Tooltip content={'Discord'} wrapperTag="div" placement="up">
              <a
                href="https://discord.gg/FQtyMWFZQ9"
                target="_blank"
                rel="noreferrer"
                className={`${
                  mode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                } p-2 hidden rounded-full sm:flex items-center justify-center `}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.3175 1.49295C18.7875 0.80295 17.1475 0.29295 15.4325 0.00295017C15.4172 1.80819e-05 15.4014 0.00190762 15.3872 0.0083575C15.3731 0.0148074 15.3613 0.0254985 15.3535 0.0389502C15.1435 0.40795 14.9095 0.88895 14.7455 1.26895C12.9266 0.997187 11.0774 0.997187 9.25848 1.26895C9.07581 0.847811 8.86983 0.437174 8.64148 0.0389502C8.63374 0.0253329 8.62203 0.0143999 8.60792 0.0076103C8.5938 0.000820665 8.57795 -0.00150281 8.56248 0.000950073C6.84848 0.29095 5.20848 0.80095 3.67748 1.49195C3.66431 1.49747 3.65314 1.5069 3.64548 1.51895C0.533481 6.09395 -0.319519 10.556 0.0994806 14.962C0.100647 14.9727 0.103996 14.9832 0.109326 14.9926C0.114655 15.0021 0.121853 15.0104 0.130481 15.017C1.94687 16.3394 3.97282 17.3468 6.12348 17.997C6.13847 18.0016 6.15451 18.0016 6.16949 17.9969C6.18448 17.9923 6.19772 17.9832 6.20748 17.9709C6.67028 17.352 7.08038 16.6954 7.43348 16.0079C7.43838 15.9986 7.44121 15.9882 7.44176 15.9776C7.44232 15.967 7.4406 15.9565 7.43671 15.9466C7.43282 15.9367 7.42686 15.9278 7.41923 15.9205C7.4116 15.9131 7.40248 15.9075 7.39248 15.9039C6.74649 15.6607 6.12057 15.3671 5.52048 15.0259C5.5097 15.0198 5.50061 15.0111 5.49404 15.0005C5.48746 14.99 5.48361 14.978 5.48281 14.9656C5.48202 14.9532 5.48432 14.9408 5.48949 14.9295C5.49467 14.9183 5.50257 14.9084 5.51248 14.9009C5.63848 14.8079 5.76448 14.711 5.88448 14.614C5.89528 14.6052 5.90829 14.5997 5.92206 14.5979C5.93584 14.5961 5.94983 14.5982 5.96248 14.604C9.88948 16.368 14.1425 16.368 18.0235 14.604C18.0362 14.5979 18.0503 14.5955 18.0643 14.5971C18.0782 14.5987 18.0915 14.6042 18.1025 14.6129C18.2225 14.7109 18.3475 14.8079 18.4745 14.9009C18.4845 14.9083 18.4925 14.918 18.4979 14.9292C18.5032 14.9403 18.5057 14.9527 18.5051 14.9651C18.5045 14.9774 18.5008 14.9895 18.4945 15.0001C18.4881 15.0107 18.4791 15.0196 18.4685 15.0259C17.8705 15.3699 17.2485 15.661 16.5955 15.903C16.5855 15.9066 16.5763 15.9123 16.5687 15.9198C16.561 15.9272 16.5551 15.9362 16.5512 15.9462C16.5473 15.9561 16.5456 15.9668 16.5462 15.9774C16.5467 15.9881 16.5496 15.9985 16.5545 16.0079C16.9145 16.6949 17.3265 17.3489 17.7795 17.9699C17.7889 17.9827 17.802 17.9922 17.8171 17.9972C17.8321 18.0022 17.8483 18.0025 17.8635 17.9979C20.0178 17.3496 22.0471 16.3417 23.8655 15.017C23.8744 15.0107 23.8818 15.0027 23.8873 14.9934C23.8928 14.9841 23.8963 14.9737 23.8975 14.9629C24.3975 9.86895 23.0595 5.44295 20.3485 1.52095C20.3418 1.5082 20.3308 1.49827 20.3175 1.49295ZM8.02048 12.2789C6.83848 12.2789 5.86348 11.2099 5.86348 9.89895C5.86348 8.58695 6.81948 7.51895 8.02048 7.51895C9.23048 7.51895 10.1965 8.59595 10.1775 9.89895C10.1775 11.2109 9.22148 12.2789 8.02048 12.2789ZM15.9955 12.2789C14.8125 12.2789 13.8385 11.2099 13.8385 9.89895C13.8385 8.58695 14.7935 7.51895 15.9955 7.51895C17.2055 7.51895 18.1715 8.59595 18.1525 9.89895C18.1525 11.2109 17.2065 12.2789 15.9955 12.2789Z"
                    fill={mode ? 'white' : '#656565'}
                  />
                </svg>
              </a>
            </Tooltip>
            {userLogged && (
              <div
                className={`${userLogged && 'sm:flex'}  items-center hidden`}
              >
                <Avatar userImg={user?.photoURL} email={user?.email} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`absolute  z-55 w-full shadow-lg  ${
          mode ? 'bg-dark-mode' : 'bg-white'
        } md:block md:w-auto"`}
      >
        <ul
          className={`${
            menuState ? 'flex sm:hidden' : 'hidden'
          } w-full flex-col   space-y-2  p-4 mt-4  rounded-lg  border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 `}
        >
          <li>
            <Link
              href="/"
              className={`block ${
                mode ? 'text-dark-mode' : 'text-white'
              } bg-primary-color py-2 pr-4 pl-3 text-white rounded font-semibold`}
            >
              <span
                className={`block ${
                  mode ? 'text-white' : 'text-black'
                } py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3 ${
                  active === 'home' &&
                  'bg-primary-color !text-white font-semibold'
                }`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/projects'}>
              <span
                className={`block ${
                  mode ? 'text-white' : 'text-black'
                } py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  ${
                  active === 'projects' &&
                  'bg-primary-color !text-white font-semibold'
                } `}
              >
                Project
              </span>
            </Link>
          </li>
          <li>
            <Link href={'/about'}>
              <span
                className={`block ${
                  mode ? 'text-white' : 'text-black'
                } py-2 hover:bg-primary-color hover:text-white hover:font-semibold  pr-4 pl-3 ${
                  active === 'about' &&
                  'bg-primary-color !text-white font-semibold'
                }  `}
              >
                About
              </span>
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/rohitdasu/projectmate"
              className={`block ${
                mode ? 'text-white' : 'text-black'
              } py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/FQtyMWFZQ9"
              className={`block ${
                mode ? 'text-white' : 'text-dark-mode'
              }    py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
            >
              Discord
            </a>
          </li>
          {userLogged && (
            <>
              <li>
                <a
                  href="#"
                  className={`block ${
                    mode ? 'text-white' : 'text-dark-mode'
                  }    py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
                >
                  Profile
                </a>
              </li>
              <li
                onClick={() => {
                  signOut(auth);
                  dispatch(setUserLoggedOut());
                  mode
                    ? toast.success('Logout was successful', {
                        position: 'bottom-center',
                        duration: 2000,
                        style: {
                          borderRadius: '10px',
                          background: '#333',
                          color: '#fff',
                        },
                      })
                    : toast.success('Logout was successful', {
                        position: 'bottom-center',
                      });
                  setMenuState(!menuState);
                }}
              >
                <a
                  href="#"
                  className={`block ${
                    mode ? 'text-white' : 'text-dark-mode'
                  }    py-2 hover:bg-primary-color hover:text-white hover:font-semibold pr-4 pl-3  `}
                >
                  Log out
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};