'use client';
import React, {useMemo, useRef} from 'react';
import {useAccount} from "wagmi";
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import classNames from "classnames";
import {
  DynamicConnectButton,
  DynamicUserProfile,
  useDynamicContext
} from "@dynamic-labs/sdk-react";

type Whal3sDynamicButtonProps = {
  onClaim: () => void,
  isClaimed: boolean,
  isClaimedText?: string,
  isNotClaimedText?: string,
  connectWalletText?: string,
}
const Whal3sDynamicButtonProps = ({
                         onClaim,
                         isClaimed,
                         isClaimedText = 'Claimed',
                         isNotClaimedText = 'Claim',
                         connectWalletText = 'Connect Wallet',
                       }: Whal3sDynamicButtonProps) => {
  const connectedRef = useRef<HTMLDivElement>(null)
  const connectRef = useRef<HTMLDivElement>(null)
  const {address, isConnected} = useAccount()
  const {setShowDynamicUserProfile} = useDynamicContext();


  const truncatedAddress = useMemo(() => {
    if (address) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    return ''
  }, [address])

  const nodeRef = isConnected ? connectedRef : connectRef


  return (
    <>
      <SwitchTransition mode={'out-in'}>
        <CSSTransition
          key={isConnected ? 'is-connected' : 'connect'}
          nodeRef={nodeRef}
          addEndListener={(done: any) => {
            if (nodeRef.current) {
              nodeRef.current.addEventListener('transitionend', done, false)
            }
          }}
          classNames='fade'
        >

          <div ref={nodeRef}>
            {isConnected ? (<div
              className={'whal3s-mt-6 whal3s-grid whal3s-grid-cols-2 whal3s-gap-5'}>
              <button
                onClick={onClaim}
                type='button'
                className={classNames(
                  isClaimed ? 'whal3s-bg-teal-500 whal3s-text-white hover:whal3s-bg-teal-400 focus:ring-teal-500' : 'whal3s-bg-black whal3s-text-white hover:whal3s-bg-gray-800 focus:whal3s-ring-gray-900',
                  'whal3s-flex whal3s-w-full whal3s-items-center whal3s-justify-center whal3s-rounded-md whal3s-border border-transparent whal3s-px-4 whal3s-py-2 focus:whal3s-outline-none focus:whal3s-ring-2  focus:whal3s-ring-offset-2',
                )}
              >
                <span className='whal3s-sr-only'>Claim with Whal3s</span>
                <img src={'https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/whal3s_slim.png'}
                     alt={'Whal3s logo'}
                     className={'whal3s-h-6 whal3s-w-auto whal3s-mr-2.5'}/>
                <span>{isClaimed ? isClaimedText : isNotClaimedText}</span>
              </button>
              <button
                onClick={() => {
                  console.log('click')
                  // setShowAuthFlow(true)
                  setShowDynamicUserProfile(true)
                }}
                type={'button'}
                className={`whal3s-w-full whal3s-rounded-md whal3s-bg-whal3s-50 whal3s-px-4 whal3s-py-2 whal3s-text-sm whal3s-font-semibold whal3s-text-whal3s-600 whal3s-shadow-sm hover:whal3s-bg-whal3s-100`}>
                {truncatedAddress}
              </button>

            </div>) : (

              <>
                <DynamicConnectButton
                  buttonClassName={`whal3s-mt-6  whal3s-w-full  whal3s-rounded-md whal3s-border whal3s-border-transparent whal3s-bg-black whal3s-px-4 whal3s-py-2 whal3s-text-white hover:whal3s-bg-gray-800 focus:whal3s-outline-none focus:whal3s-ring-2 focus:whal3s-ring-gray-900 focus:whal3s-ring-offset-2`}
                >
                                <span className={`whal3s-flex whal3s-items-center whal3s-justify-center`}>
                                    <span
                                      className='whal3s-sr-only'>Claim with Whal3s</span>
                                <img src={'https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/whal3s_slim.png'}
                                     alt={'Whal3s logo'}
                                     className={'whal3s-h-6 whal3s-w-auto whal3s-mr-2.5'}/>
                                <span>{connectWalletText}</span>

                                </span>
                </DynamicConnectButton>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
      <DynamicUserProfile/>
    </>

  )


};

export default Whal3sDynamicButtonProps;
