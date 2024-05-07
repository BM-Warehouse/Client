/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import Image from 'next/image';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';
import { MdWarehouse } from 'react-icons/md';

import Ellipse from '@/assets/images/Ellipse.png';
import HumanTalk from '@/assets/images/HumanTalk.png';
import BWMLogo from '@/assets/images/LogoBMW2.png';

function Home() {
  return (
    <main className="min-h-screeen font-poppins">
      <header>
        <div className="navbar fixed top-0 z-20 bg-primary py-3">
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost font-josefin text-xl">
              <Image src={BWMLogo} width={50} height={50} alt="Logo BM Warehouse" />
              <span className="font-josefin font-bold text-tertiary">B&M Warehouse</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="#why-choose-us" className="hover:font-bold">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#about-us" className="hover:font-bold">
                  About Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:font-bold">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#footer" className="hover:font-bold">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn hidden bg-secondary text-white hover:bg-tertiary lg:flex">
              <FiLogIn /> <span>Log In</span>
            </a>
            <details className="menu dropdown dropdown-end menu-lg lg:hidden">
              <summary className="btn m-1 bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </summary>
              <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                <li>
                  <a href="#why-choose-us">Why Choose Us</a>
                </li>
                <li>
                  <a href="#about-us">About Us</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#footer">Contact Us</a>
                </li>
                <li>
                  <a className="btn mx-5 my-2 bg-secondary text-base text-white hover:bg-tertiary">
                    <FiLogIn /> <span>Log In</span>
                  </a>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </header>
      <section id="herow" className="mt-24 w-full">
        <div className="herow-content mt-10 flex flex-col-reverse  items-center justify-between pl-0 lg:flex-row ">
          <div className="hero-content-left relative mt-10 lg:mt-0">
            <Image src={Ellipse} alt="Ellips" className="" />
            <div className="text-content bg-tranparent z-2 absolute left-10 top-14 max-w-[20rem] text-white md:left-20 md:top-28  md:max-w-[30rem]">
              <h1 className="text-2xl font-bold md:text-4xl">Lorem Ipsum</h1>
              <p className=" mt-3 text-sm md:mt-10 md:text-base">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, Lorem ipsum dolor sit amet, consectetuer adipiscing elit
              </p>
              <button className="btn btn-outline mt-3 w-40 text-white md:mt-10">Get Started</button>
            </div>
          </div>
          <div className="hero-content-right xl:mr-20">
            <Image
              src={HumanTalk}
              alt="Human Talking"
              className="h-52 w-52 md:h-96 md:w-96 xl:h-full xl:w-full"
            />
          </div>
        </div>
        <div className="hero-additional-info mt-20 grid w-full grid-cols-3 place-content-center place-items-center gap-4 bg-secondary  py-8 text-xl font-bold text-white md:text-2xl">
          <span className="flex flex-col items-center justify-center">
            <h2>Counter 1</h2>
            <h2>600+</h2>
          </span>
          <span className="flex flex-col items-center justify-center">
            <h2>Clients</h2>
            <h2>50+</h2>
          </span>
          <span className="flex flex-col items-center justify-center">
            <h2>Clients</h2>
            <h2>50+</h2>
          </span>
        </div>
      </section>
      <section id="about-us" className="mt-10 flex w-full flex-col  items-center">
        <h2 className="text-3xl font-bold text-secondary">About Us</h2>
        <div className="about-us-content mt-10  flex flex-col items-center xl:flex-row">
          <div className="about-us-left px-5 text-tertiary md:px-10 xl:w-1/2 xl:px-20">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, Lorem ipsum dolor sit amet, consectetuer adipiscing elit
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, Lorem ipsum dolor sit amet, consectetuer adipiscing elit
            </p>
          </div>
          <div className="about-us-right mt-10 flex w-1/2 items-center justify-center xl:mt-0">
            <Image src={BWMLogo} alt="Logo BM Warehouse" />
          </div>
        </div>
      </section>
      <section id="why-choose-us" className="mt-10 flex w-full flex-col  items-center">
        <h2 className="text-3xl font-bold text-secondary">Why Choose Us?</h2>
        <div className="why-choose-us-content mx-3 mt-10 grid  grid-cols-1 gap-10 md:grid-cols-2 xl:mx-10 xl:grid-cols-3 xl:gap-24">
          <div className="card-why-us flex h-[28rem]   w-full flex-col items-center justify-center rounded-lg bg-secondary  px-10 text-white">
            <div className="img">
              <MdWarehouse className="text-8xl" />
            </div>
            <div className="desc mt-3">
              <h5 className="mb-2 text-lg font-bold">Lorem Ipsum</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
              </p>
            </div>
          </div>
          <div className="card-why-us flex h-[28rem]   w-full flex-col items-center justify-center rounded-lg bg-secondary  px-10 text-white">
            <div className="img">
              <MdWarehouse className="text-8xl" />
            </div>
            <div className="desc mt-3">
              <h5 className="mb-2 text-lg font-bold">Lorem Ipsum</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
              </p>
            </div>
          </div>
          <div className="card-why-us flex h-[28rem]   w-full flex-col items-center justify-center rounded-lg bg-secondary  px-10 text-white">
            <div className="img">
              <MdWarehouse className="text-8xl" />
            </div>
            <div className="desc mt-3">
              <h5 className="mb-2 text-lg font-bold">Lorem Ipsum</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="mt-10 flex w-full flex-col  items-center">
        <h2 className="text-3xl font-bold text-secondary">FAQ</h2>
        <div className="faq content mt-10 w-full px-5 xl:px-20 ">
          <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
            <input type="checkbox" />
            <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?
            </div>
            <div className="collapse-content text-xs md:text-sm xl:text-base">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?
              </p>
            </div>
          </div>
          <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
            <input type="checkbox" />
            <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?
            </div>
            <div className="collapse-content text-xs md:text-sm xl:text-base">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?
              </p>
            </div>
          </div>
          <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
            <input type="checkbox" />
            <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?
            </div>
            <div className="collapse-content text-xs md:text-sm xl:text-base">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?
              </p>
            </div>
          </div>
          <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
            <input type="checkbox" />
            <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?
            </div>
            <div className="collapse-content text-xs md:text-sm xl:text-base">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?
              </p>
            </div>
          </div>
          <div className="collapse mb-5 w-full rounded-sm border border-tertiary">
            <input type="checkbox" />
            <div className="text-md collapse-title font-medium text-tertiary md:text-lg xl:text-xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh?
            </div>
            <div className="collapse-content text-xs md:text-sm xl:text-base">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh?
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer" className="mt-10">
        <div className="footer bg-primary p-10 text-tertiary">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link-hover link">Branding</a>
            <a className="link-hover link">Design</a>
            <a className="link-hover link">Marketing</a>
            <a className="link-hover link">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link-hover link">About us</a>
            <a className="link-hover link">Contact</a>
            <a className="link-hover link">Jobs</a>
            <a className="link-hover link">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link-hover link">Terms of use</a>
            <a className="link-hover link">Privacy policy</a>
            <a className="link-hover link">Cookie policy</a>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
        <div className="footer footer-center bg-secondary p-4 text-white">
          <aside>
            <p>Copyright © 2024 - All right reserved by B&M Warehouse Ltd</p>
          </aside>
        </div>
      </footer>
    </main>
  );
}

export default Home;
