import { Grid, Paper } from "@mui/material";
import { IconType } from "react-icons";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

class Tile {
    public icon!: IconType;
    public title: string = '';
    public link: string = '';
}

function AdminRoot () {

    const tiles:Tile[] = [{icon:FaUser,title:"Users",link:"users"}]

    return (
        <Grid container justifyContent="left" spacing={2} style={{marginTop:"unset"}}>
            {tiles.map((value) => (
                <Grid item xs={3}>
                    <Link to={`/admin/${value.link}`} style={{textDecoration:"none"}}>
                        <Paper
                            sx={{
                            height: 150,
                            backgroundColor: '#2b3035',
                            color: '#ffffff',
                            paddingTop: 3
                            }}
                        >
                            {<value.icon size={70}/>}<br/>
                            {value.title}
                        </Paper>
                    </Link>
                </Grid>
            ))}
      </Grid>
    )
}

export default AdminRoot;