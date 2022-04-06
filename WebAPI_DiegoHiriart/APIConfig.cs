//Diego Hiriart Leon

namespace WebAPI_DiegoHiriart
{
    public static class APIConfig
    {
        private static string connectionString =
        @"Data Source=DIEGOHL\SQLDEV;Database=IngWebDev;Integrated Security=SSPI";
        //@"Data Source=DIEGOHL\SQLEXPR;Database=IngWebPrd;Integrated Security=SSPI"

        public static string ConnectionString { get => connectionString; set => connectionString = value; }

    }
}
