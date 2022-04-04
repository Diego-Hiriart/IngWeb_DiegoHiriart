//Diego Hiriart Leon
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using WebAPI_DiegoHiriart.Models;

namespace WebAPI_DiegoHiriart.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        [HttpPost]//Maps method to Post request
        public async Task<ActionResult<List<User>>> CreateUser(User user)
        {
            string db = APIConfig.ConnectionString;
            string createUser = "INSERT INTO Users(Email, Password, Username) values(@0, @1, @2)";
            try
            {
                using (SqlConnection conn = new SqlConnection(db))
                {
                    conn.Open();
                    if (conn.State == ConnectionState.Open)
                    {
                        using (SqlCommand cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = createUser;
                            cmd.Parameters.AddWithValue("@0", user.Email);//Replace the parameteres of the string
                            cmd.Parameters.AddWithValue("@1", user.Password);
                            cmd.Parameters.AddWithValue("@2", user.Username);
                            cmd.ExecuteNonQuery();
                        }
                    }
                }
                return Ok(user);
            }
            catch (Exception eSql)
            {
                Debug.WriteLine("Exception: " + eSql.Message);
                return StatusCode(500, user);
            }
        }


        [HttpGet]//Maps this method to the GET request (read)
        public async Task<ActionResult<List<User>>> ReadUsers()
        {
            List<User> users = new List<User>();
            string db = APIConfig.ConnectionString;
            string readUsers = "SELECT * FROM Users";
            try
            {
                using (SqlConnection conn = new SqlConnection(db))
                {
                    conn.Open();
                    if (conn.State == ConnectionState.Open)
                    {
                        using (SqlCommand cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = readUsers;
                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    var user = new User();
                                    user.UserID = reader.GetInt64(0);//Get a long int from the first column
                                    //Use castings so that nulls get created if needed
                                    user.Email = reader[1] as string;
                                    user.Password = reader[2] as string;
                                    user.Username = reader[3] as string;
                                    users.Add(user);//Add user to list
                                }
                            }
                        }
                    }
                }
                return Ok(users);
            }
            catch (Exception eSql)
            {
                Debug.WriteLine("Exception: " + eSql.Message);
                return StatusCode(500);
            }    
        }

        [HttpGet("{id}")]//Maps this method to the GET request (read) for a specific ID
        public async Task<ActionResult<List<User>>> ReadUserByID(int id)
        {
            List<User> users = new List<User>();
            string db = APIConfig.ConnectionString;
            string readUsers = "SELECT * FROM Users WHERE UserID = @0";
            try
            {
                using (SqlConnection conn = new SqlConnection(db))
                {
                    conn.Open();
                    if (conn.State == ConnectionState.Open)
                    {
                        using (SqlCommand cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = readUsers;
                            cmd.Parameters.AddWithValue("@0", id);
                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    var user = new User();
                                    user.UserID = reader.GetInt64(0);//Get a long int from the first column
                                    //Use castings so that nulls get created if needed
                                    user.Email = reader[1] as string;
                                    user.Password = reader[2] as string;
                                    user.Username = reader[3] as string;
                                    users.Add(user);//Add user to list
                                }
                            }
                        }
                    }
                }
                if (users.Count > 0)
                {
                    return Ok(users);
                }               
            }
            catch (Exception eSql)
            {
                Debug.WriteLine("Exception: " + eSql.Message);
                return StatusCode(500);
            }
            return BadRequest("User not found");
        }

        [HttpPut]//Maps the method to PUT, that is update a Hero
        public async Task<IActionResult> UpdateUser(User user)
        {
            string db = APIConfig.ConnectionString;
            string updateUser = "UPDATE Users SET Email=@0, Password=@1, UserName=@2 WHERE UserID = @3";
            try
            {
                int affectedRows = 0;
                using (SqlConnection conn = new SqlConnection(db))
                {
                    conn.Open();
                    if (conn.State == ConnectionState.Open)
                    {
                        using (SqlCommand cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = updateUser;
                            cmd.Parameters.AddWithValue("@0", user.Email);
                            cmd.Parameters.AddWithValue("@1", user.Password);
                            cmd.Parameters.AddWithValue("@2", user.Username);
                            cmd.Parameters.AddWithValue("@3", user.UserID);
                            affectedRows = cmd.ExecuteNonQuery();                         
                        }
                    }
                }
                if (affectedRows > 0)
                {
                    return Ok(user);
                }
                
            }
            catch (Exception eSql)
            {
                Debug.WriteLine("Exception: " + eSql.Message);
                return StatusCode(500);
            }
            return BadRequest("User not found");
        }

        [HttpDelete("{id}")]//Maps the method to DELETE by id
        public async Task<IActionResult> DeleteUser(int id)
        {
            string db = APIConfig.ConnectionString;
            string deleteUser = "DELETE FROM Users WHERE UserID = @0";
            try
            {
                int affectedRows = 0;
                using (SqlConnection conn = new SqlConnection(db))
                {
                    conn.Open();
                    if (conn.State == ConnectionState.Open)
                    {
                        using (SqlCommand cmd = conn.CreateCommand())
                        {
                            cmd.CommandText = deleteUser;
                            cmd.Parameters.AddWithValue("@0", id);
                            affectedRows = cmd.ExecuteNonQuery();
                        }
                    }
                }
                if (affectedRows > 0)
                {
                    return Ok();
                }

            }
            catch (Exception eSql)
            {
                Debug.WriteLine("Exception: " + eSql.Message);
                return StatusCode(500);
            }
            return BadRequest("User not found");
        }
    }
}
