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
import { fetchAllInvites, deleteInvite } from '../../shared/services/invites.service';
import { MdRefresh } from 'react-icons/md';
import { FcCheckmark } from 'react-icons/fc';
import DeletionModal from '../../shared/components/DeletionModal';
import CreateInviteModal from './components/CreateInviteModal';

function AdminInvites() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [invites, setInvites] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [,setError] = useState<any>(null);
    const [totalInvites, setTotalInvites] = useState(0);

    async function loadInvites() {
        try {
            //MUI paginator is 0-indexed but Kaminari is 1-indexed
            let data = await fetchAllInvites(page+1, rowsPerPage);
            if(data.invites) {
                setInvites(data.invites);
                setTotalInvites(data.total_count);
                setRowsPerPage(Number.parseInt(data.per_page));
            }
            setLoading(false);
        } catch(e) {
            setError(e);
            setLoading(false);
            console.error("Failed to fetch invites: ", e);
        }
    }

    useEffect(() => {
        loadInvites();
    }, [rowsPerPage, page])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, rowsPerPage - invites.length);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
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
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Consumed</TableCell>
            <TableCell align="right">
                <CreateInviteModal callback={loadInvites}/>
                <Tooltip title="Refresh">
                    <IconButton onClick={() => {loadInvites()}}>
                        <MdRefresh/>
                    </IconButton>
                </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invites.map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: 160 }} align="right">
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.consumed? <FcCheckmark/> : <></>}
              </TableCell>
              <TableCell align="right">
                <DeletionModal title={row.email} id={row.id} deletion={deleteInvite} callback={()=> {loadInvites()}}/>
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
              count={totalInvites}
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

export default AdminInvites;