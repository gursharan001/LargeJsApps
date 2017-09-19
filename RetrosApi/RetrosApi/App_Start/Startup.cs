using System.Web.Http;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(RetrosApi.Startup))]

namespace RetrosApi
{
    
    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            appBuilder.ConfigureSignalr();

            ConfigureWebApi(appBuilder);
        }

        private static void ConfigureWebApi(IAppBuilder appBuilder)
        {
            var httpConfiguration = new HttpConfiguration();
            WebApiConfig.Register(httpConfiguration);
            appBuilder.UseWebApi(httpConfiguration);
        }
    }
}