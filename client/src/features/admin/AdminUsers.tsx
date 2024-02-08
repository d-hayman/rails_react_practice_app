import { 
    TableContainer, 
    Table, 
    TableHead, 
    TableBody, 
    TableFooter,
    TableRow,
    TableCell, 
    TablePagination,
    Tooltip,
    IconButton
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../../shared/services/users.service';
import { Button } from 'react-bootstrap';
import { MdRefresh } from 'react-icons/md';
import { FaKey } from 'react-icons/fa';

function AdminUsers() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<any>(null);
    const [totalUsers, setTotalUsers] = useState(0);

    async function loadUsers() {
        try {
            //MUI paginator is 0-indexed but Kaminari is 1-indexed
            let data = await fetchAllUsers(page+1, rowsPerPage);
            if(data.users) {
                setUsers(data.users);
                setTotalUsers(data.total_count);
                setRowsPerPage(data.per_page);
            }
            setLoading(false);
        } catch(e) {
            setError(e);
            setLoading(false);
            console.error("Failed to fetch users: ", e);
        }
    }

    useEffect(() => {
        loadUsers();
    }, [rowsPerPage, page])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, rowsPerPage - users.length);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Last Login</TableCell>
            <TableCell align="right">
                <Tooltip title="Refresh">
                    <IconButton>
                        <MdRefresh onClick={() => {loadUsers()}}/>
                    </IconButton>
                </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.username}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.lastLogin}
              </TableCell>
              <TableCell align="right">
                <Button variant="outline-secondary" size='sm' href={`/admin/users/${row.id}/permissions`}>
                    <FaKey/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 64 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={totalUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default AdminUsers;