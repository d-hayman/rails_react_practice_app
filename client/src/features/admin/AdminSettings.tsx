import Paper from '@mui/material/Paper';
import { ReactNode, useEffect, useState } from 'react';
import { fetchAllSettings } from '../../shared/services/settings.service';
import { FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { Button, Col, Container, Row } from 'react-bootstrap';

function AdminSettings() {
    const [settings, setSettings] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [,setError] = useState<any>(null);

    async function loadSettings() {
        try {
            //MUI paginator is 0-indexed but Kaminari is 1-indexed
            let data = await fetchAllSettings();
            if(data.settings) {
                setSettings(data.settings);
            }
            setLoading(false);
        } catch(e) {
            setError(e);
            setLoading(false);
            console.error("Failed to fetch settings: ", e);
        }
    }

    useEffect(() => {
      loadSettings();
    }, [])

  function renderSwitch(row: any, index: number): ReactNode {
    switch(row.type) {
      case 'ToggleSetting':
        return (
          <FormControlLabel control={
            <Switch 
              checked={row.value == "True"} 
              onChange={handleChange(index)} 
            />
          } label={row.name} />
        );
      case 'TextSetting':
        return (
          <TextField
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
              value={row.value} 
              onChange={handleChange(index)} label={row.name}
            />
        )
      default:
        return `UNSUPPORTED TYPE ERROR: ${row.type}`;
    }
  }
  
  function handleChange(index: number) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      let newArr = [...settings]; // Copying the old settings array
      switch(newArr[index].type) {
        case 'ToggleSetting':
          newArr[index].value = event.target.checked ? "True" : "False"; // Update the value at the specified index
          break;
        default:
          newArr[index].value = event.target.value; // Update the value at the specified index
      }
      
  
      setSettings(newArr);
    };
  }

  return (
    <Paper style={{padding:15}}>
          <Container>
            <Row style={{marginBottom:15}}>
              <Col>
                <Button style={{float:"right"}}>Save</Button>
              </Col>
            </Row>
            <Row>
              {settings.map((row, index) => (
                <Col sm={6}>
                  <FormGroup>
                    {renderSwitch(row, index)}
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </Container>
    </Paper>
  );
}

export default AdminSettings;