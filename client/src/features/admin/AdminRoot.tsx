import { Grid, Paper } from "@mui/material";
import { IconType } from "react-icons";
import { FaCog, FaUser } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { Link } from "react-router-dom";

class Tile {
    public icon!: IconType;
    public title: string = '';
    public link: string = '';
}

function AdminRoot () {

    const tiles:Tile[] = [
        {icon:FaUser,title:"Users",link:"users"},
        {icon:FcInvite,title:"Invites",link:"invites"},
        {icon:FaCog,title:"Settings",link:"settings"},
    ];

    return (
        <Grid container justifyContent="left" spacing={2} style={{marginTop:"unset"}}>
            {tiles.map((value) => (
                <Grid item xs={3} key={value.title}>
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