# Whal3s UI Components for Dynamic

## Installation

```bash
npm install @whal3s/react-dynamic
```

## Usage

```jsx
'use client';
import dynamic from 'next/dynamic'
import { Providers } from '@/app/providers'

const DynamicWhal3sDynamicButton = dynamic(() => import('@whal3s/react-dynamic').then((mod) => mod.Whal3sDynamicButton), {ssr: false});

const Claim = () => {
  return (
    <Providers>
      <DynamicWhal3sDynamicButton isClaimed={false} onClaim={() => {}}/>
    </Providers>
  )

};

export default Claim;
```

