import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
} from "@fortawesome/free-solid-svg-icons";
import { CMS_NAME } from '../lib/constants'

const Header = () => {
  return (
    <div className="container mx-auto lg:px-10 mb-8">
      <div className="border-b border-white border-opacity-50 w-full inline-block py-6">
        <div className="md:float-left block">
            
          <Link href="/">
            <div className="cursor-pointer">
              <FontAwesomeIcon
                icon={faBlog}
                style={{ fontSize: "1.5rem", color: "#ffffff" }}
              />
              <span className="cursor-pointer font-bold text-2xl text-white ml-3">Blog with {CMS_NAME}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
