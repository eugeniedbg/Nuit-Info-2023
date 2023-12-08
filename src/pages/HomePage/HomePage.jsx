import { Box, Typography } from "@mui/material"
import IntroPopUp  from "../../components/IntroPopUp/IntroPopUp"
import ResponsiveAppBar from "../../components/general/ResponsiveAppBar"
import Jeux from "../../components/Jeux/Jeux"
import "../../styles/pages/homepage.scss" 
import { useEffect, useState } from "react"

const HomePage = () => {
    const [popupIsActiveForStartGame, setPopupIsActiveForStartGame] = useState(true);

    return (
        <>
            <ResponsiveAppBar />
            <Box className="boxHomepage">
                {popupIsActiveForStartGame ? (
                    <IntroPopUp setPopupIsActiveForStartGame={setPopupIsActiveForStartGame}/>
                ) : (
                    <Jeux />
                )}
            </Box>
        </>
    )
}

export default HomePage
