import { useEffect, useState } from "react";
import { fetchUser, setUserPermissions } from "../../shared/services/users.service";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../shared/models/user.model";
import { Permission } from "../../shared/models/permission.model";
import { fetchAllPermissions } from "../../shared/services/permissions.service";
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Checkbox } from "@mui/material";
import { Button } from "react-bootstrap";
import ErrorModal from "../../shared/components/ErrorModal";

function AdminUsersPermissions() {
    const { id } = useParams();
    const [user, setUser] = useState<User>(new User());
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [, setLoading] = useState(true);
    const [,setError] = useState<any>(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [errorHeaderText, setErrorHeaderText] = useState('');
    const [errorBodyText, setErrorBodyText] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);

    const navigate = useNavigate();

    /**
     * 
     * @param callback 
     */
    async function loadPermissions(callback: any) {
        try {
            let data = await fetchAllPermissions();
            const fetchedPermissions: Permission[] = []
            for(const permission of data.permissions) {
                fetchedPermissions.push(Permission.buildPermissionData(permission));
            }
            setPermissions(fetchedPermissions);
            if(typeof callback === "function") {
                callback();
            }
        } catch(e) {
            setError(e);
            setLoading(false);
            console.error("Failed to fetch permissions: ", e);
        }
    }

    /**
     * 
     */
    async function loadUsers() {
        try {
            let data = await fetchUser(id);
            // it seems things set in use state aren't immediately accessible on this render frame
            const user = User.buildUserData(data);
            setUser(user);
            const newSelected = user.permissions.map((p) => p.id);
            setSelected(newSelected);
            setLoading(false);
        } catch(e) {
            setError(e);
            setLoading(false);
            console.error("Failed to fetch users: ", e);
        }
    }

    useEffect(() => {
        loadPermissions(loadUsers);
    }, []);

    // --- EVENT HANDLERS ---//
    /**
     * 
     * @param event 
     * @returns 
     */
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelected = permissions.map((p) => p.id);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
    };

    /**
     * 
     * @param event 
     * @param id 
     */
    const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    const savePermissions =async () => {
        try {
            await setUserPermissions(id, [...selected]);
            navigate(`/admin/users`);
        } catch (e) {
            setErrorHeaderText("Failed to Update User");
            setErrorBodyText(`${e}`);
            setErrorVisible(true);
            console.error("Failed to update the user: ", e);
        }
    }

    // --- TABLE CONTROL --- //
    const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - permissions.length) : 0;

    return ( 
        <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>
                        <Checkbox
                            color="primary"
                            indeterminate={selected.length > 0 && selected.length < permissions.length}
                            checked={selected.length > 0 && selected.length == permissions.length}
                            onChange={handleSelectAllClick}
                            inputProps={{
                            'aria-label': 'select all permissions',
                            }}
                        />
                    </TableCell>
                    <TableCell align="center">Model</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? permissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : permissions
                ).map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                    <TableRow 
                        key={`${row.model}-${row.action}`}
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                'aria-labelledby': labelId,
                                }}
                            />
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {row.model}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {row.action}
                        </TableCell>
                    </TableRow>
                    )
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={3} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={4}
                        count={permissions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={4}><Button onClick={savePermissions} style={{float:"right"}}>Save</Button></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>

        <ErrorModal 
            bodyText={errorBodyText}
            headerText={errorHeaderText}
            visible={errorVisible}
            setVisible={setErrorVisible}
            />
        </>
    );
}

export default AdminUsersPermissions;