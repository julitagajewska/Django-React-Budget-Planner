import React, { ReactNode, PropsWithChildren } from 'react';

type PageContainerProps = {
    children: ReactNode
}

const PageContainer = (props: PropsWithChildren<PageContainerProps>) => {
    return (
        <div className='theme-base w-full h-full overflow-y-auto snap-y'>
            {props.children}
        </div>
    )
}

export default PageContainer