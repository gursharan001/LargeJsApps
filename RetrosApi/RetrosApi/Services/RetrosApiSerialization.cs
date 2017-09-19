using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization.Formatters;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace RetrosApi.Services
{
    public static class RetrosApiSerialization
    {
        public static string SerializeViewModel(this object viewModel, JsonSerializerSettings settings = null)
        {
            return JsonConvert.SerializeObject(viewModel, Formatting.None, settings ?? JsonSerializerSettings);
        }

        public static JsonSerializerSettings JsonSerializerSettings
        {
            get
            {
                var dateConverter = new IsoDateTimeConverter();
                var jsonSerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    TypeNameHandling = TypeNameHandling.Auto,
                    TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple,
                    Converters = new List<JsonConverter> { dateConverter }
                };
                return jsonSerializerSettings;
            }
        }

        public static T DeserializeViewModel<T>(this string viewModel)
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(viewModel, JsonSerializerSettings);
            }
            catch (TargetInvocationException tiex)
            {
                if (tiex.InnerException != null)
                {
                    throw tiex.InnerException;
                }
                throw;
            }
        }
    }
}