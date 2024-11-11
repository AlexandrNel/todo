import React from "react"
import ContentLoader from "react-content-loader"
import { useTheme } from "./ThemeProvider"

const SkeletonTask: React.FC = (props) => {
    const theme = useTheme().theme
    return (
        <div className=" py-4">
            <ContentLoader
                className="mx-auto"
                speed={2}
                width={520}
                height={36}
                viewBox="0 0 520 36"
                backgroundColor={theme === 'dark' ? '#242424' : '#f3f3f3'}
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="0" y="0" rx="0" ry="0" width="520" height="36" />
            </ContentLoader>
        </div>
    )
}

export default SkeletonTask