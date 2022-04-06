//Diego Hiriart

//Allow Cross Origin Resource Sharing
var AllowLocalhostOrigins = "AllowLocalhostOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowLocalhostOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000");//Only the front end address can use it
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseRouting();//Wasnt here before, added in case CORS needs it, might not be the case

app.UseCors(AllowLocalhostOrigins);//Use the CORS policy, after UseRouting, before UseAuthorization

app.UseAuthorization();

app.MapControllers();

app.Run();