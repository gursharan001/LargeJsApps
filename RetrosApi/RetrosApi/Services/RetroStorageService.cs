using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace RetrosApi.Services
{
    public class RetroInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class RetroStorageService
    {
        static readonly string StorageConnectionString = CloudConfigurationManager.GetSetting("StorageConnectionString");
        
        private static CloudTable GetTable(string tableName)
        {
            var storageAccount = CloudStorageAccount.Parse(StorageConnectionString);
            var tableClient = storageAccount.CreateCloudTableClient();
            var retrospectivesTable = tableClient.GetTableReference(tableName);
            retrospectivesTable.CreateIfNotExists();
            return retrospectivesTable;
        }

        public static RetroInfo[] GetAllRetrospectives()
        {
            var table = GetTable(RetrospectiveConstants.RetrospectiveTableName);
            var qry = new TableQuery<Retrospective>().Select(new List<string> { "Id", "Name" });
            var retrospectives = table.ExecuteQuery(qry);
            return retrospectives.Select(x => new RetroInfo
            {
                Id = x.Id.ToString(),
                Name = x.Name
            }).ToArray();
        }

        public static void CreateRetrospective(Guid id, string retrospectiveName)
        {
            var table = GetTable(RetrospectiveConstants.RetrospectiveTableName);
            var retrieveOperation = TableOperation.Retrieve<Retrospective>(retrospectiveName, id.ToString());
            var retrievalResult = table.Execute(retrieveOperation);
            var retrospectiveEntity = (Retrospective)retrievalResult.Result;
            if (retrospectiveEntity != null) return;
            retrospectiveEntity = new Retrospective(id, retrospectiveName)
            {
                RetrospectiveData = new RetrospectiveData().SerializeViewModel()
            };
            var insertOpertion = TableOperation.Insert(retrospectiveEntity);
            table.Execute(insertOpertion);
        }

        public static void DeleteRetrospective(Guid id, string retrospectiveName)
        {
            var table = GetTable(RetrospectiveConstants.RetrospectiveTableName);
            var retrieveOperation = TableOperation.Retrieve<Retrospective>(retrospectiveName, id.ToString());
            var retrievalResult = table.Execute(retrieveOperation);
            var retrospectiveEntity = (Retrospective)retrievalResult.Result;
            if (retrospectiveEntity == null) return;
            var deleteOperation = TableOperation.Delete(retrospectiveEntity);
            table.Execute(deleteOperation);
        }

        public static Retrospective GetRetrospective(Guid id, string retrospectiveName)
        {
            var table = GetTable(RetrospectiveConstants.RetrospectiveTableName);
            var retrieveOperation = TableOperation.Retrieve<Retrospective>(retrospectiveName, id.ToString());
            var retrievalResult = table.Execute(retrieveOperation);
            var retrospectiveEntity = (Retrospective)retrievalResult.Result;
            return retrospectiveEntity;
        }

        public static void AddComment(Guid id, string retrospectiveName, CommentType commentType, string comment, string addedBy)
        {
            var table = GetTable(RetrospectiveConstants.RetrospectiveTableName);
            var retrieveOperation = TableOperation.Retrieve<Retrospective>(retrospectiveName, id.ToString());
            var retrievalResult = table.Execute(retrieveOperation);
            var retrospectiveEntity = (Retrospective)retrievalResult.Result;
            if(retrospectiveEntity == null)
            {
                throw new Exception($"No retrospective entity found with id {id} and name {retrospectiveName}");
            }
            var retrospectiveData = retrospectiveEntity.RetrospectiveData.DeserializeViewModel<RetrospectiveData>();
            switch (commentType)
            {
                case CommentType.WentWell:
                {
                    retrospectiveData.WhatWentWell.Add((addedBy, comment));
                    break;
                }
                case CommentType.DidNotGoWell:
                {
                    retrospectiveData.WhatDidNotGoWell.Add((addedBy, comment));
                    break;
                }
                case CommentType.SuggestedImprovement:
                {
                    retrospectiveData.SuggestedImprovements.Add((addedBy, comment));
                    break;
                }
            }
            retrospectiveEntity.RetrospectiveData = retrospectiveData.SerializeViewModel();
            var updateOperation = TableOperation.Replace(retrospectiveEntity);
            table.Execute(updateOperation);
        }

        public static void RemoveComment(Guid id, string retrospectiveName, CommentType commentType, string comment, string addedBy)
        {
            var table = GetTable(RetrospectiveConstants.RetrospectiveTableName);
            var retrieveOperation = TableOperation.Retrieve<Retrospective>(retrospectiveName, id.ToString());
            var retrievalResult = table.Execute(retrieveOperation);
            var retrospectiveEntity = (Retrospective)retrievalResult.Result;
            if (retrospectiveEntity == null)
            {
                throw new Exception($"No retrospective entity found with id {id} and name {retrospectiveName}");
            }
            var retrospectiveData = retrospectiveEntity.RetrospectiveData.DeserializeViewModel<RetrospectiveData>();
            switch (commentType)
            {
                case CommentType.WentWell:
                {
                    retrospectiveData.WhatWentWell.Remove((addedBy, comment));
                    break;
                }
                case CommentType.DidNotGoWell:
                {
                    retrospectiveData.WhatDidNotGoWell.Remove((addedBy, comment));
                        break;
                }
                case CommentType.SuggestedImprovement:
                {
                    retrospectiveData.SuggestedImprovements.Remove((addedBy, comment));
                        break;
                }
            }
            retrospectiveEntity.RetrospectiveData = retrospectiveData.SerializeViewModel();
            var updateOperation = TableOperation.Replace(retrospectiveEntity);
            table.Execute(updateOperation);
        }
    }
}