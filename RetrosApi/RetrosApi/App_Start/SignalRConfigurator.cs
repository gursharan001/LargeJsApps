using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization.Formatters;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Owin;

namespace RetrosApi
{
    public static class SignalRConfigurator
    {
        public static void ConfigureSignalr(this IAppBuilder appBuilder)
        {
            ExternalAssembliesContainingHubs
                .ForEach(o => AppDomain.CurrentDomain.Load(o.FullName));

            //var resolver = new StructureMapSignalRDependencyResolver();

            //resolver.Register(typeof(JsonSerializer),
            //    () => JsonSerializer.Create(SignalRSerializerSettings));

            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => JsonSerializer.Create(SignalRSerializerSettings));
            GlobalHost.DependencyResolver.Register(typeof(RetrosHub), () => new RetrosHub());

            //var hubConfiguration = new HubConfiguration
            //{
            //    Resolver = resolver
            //};

            appBuilder.Map("/signalr", map =>
            {
                map.UseCors(CorsOptions.AllowAll);
                //map.RunSignalR(hubConfiguration);
                map.RunSignalR();
            });
        }

        private static readonly List<Assembly> ExternalAssembliesContainingHubs =
            new List<Assembly>
            {
                typeof(RetrosHub).Assembly
            };

        private static JsonSerializerSettings SignalRSerializerSettings
        {
            get
            {
                var dateConverter = new IsoDateTimeConverter();
                var jsonSerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new SignalRCamelCaseContractResolver(),
                    TypeNameHandling = TypeNameHandling.Auto,
                    TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple,
                    Converters = new List<JsonConverter> { dateConverter }
                };
                return jsonSerializerSettings;
            }
        }
    }
}