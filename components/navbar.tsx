'use client';
import { useState } from 'react';
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
  Link,
} from '@nextui-org/react';

import { link as linkStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { ThemeSwitch } from '@/components/theme-switch';
import {
  HeartFilledIcon,
  IconLinkedinCircled,
  FacebookIcon,
  InstagramIcon,
  MediumIcon,
} from '@/components/icons';

import Image from 'next/image';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <NextUINavbar maxWidth="xl" className="fixed" isMenuOpen={isMenuOpen}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 w-auto mr-8">
          <NextLink
            className="flex justify-start items-center gap-1 font-black text-2xl "
            href="/"
          >
            <Image
              src="/eeesoc-logo.png"
              alt="EEESoc Logo"
              width={30}
              height={30}
            />{' '}
            EEESoc
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        style={{ overflowX: 'hidden' }}
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            href={siteConfig.links.instagram}
            aria-label="Instagram"
          >
            <InstagramIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.facebook}
            aria-label="Facebook"
          >
            <FacebookIcon className="text-default-500" />
          </Link>

          <Link
            isExternal
            href={siteConfig.links.linkedin}
            aria-label="LinkedIn"
          >
            <IconLinkedinCircled className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.medium} aria-label="Medium">
            <MediumIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem>
          <Button
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href="/sponsor"
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor Us
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <Link
          isExternal
          href={siteConfig.links.instagram}
          aria-label="Instagram"
        >
          <InstagramIcon className="text-default-500" />
        </Link>
        <Link isExternal href={siteConfig.links.facebook} aria-label="Facebook">
          <FacebookIcon className="text-default-500" />
        </Link>

        <Link isExternal href={siteConfig.links.linkedin} aria-label="LinkedIn">
          <IconLinkedinCircled className="text-default-500" />
        </Link>
        <Link isExternal href={siteConfig.links.medium} aria-label="Medium">
          <MediumIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                href={item.href}
                size="lg"
                onClick={() => {
                  closeMenu(); // Close the menu on item click
                }}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
