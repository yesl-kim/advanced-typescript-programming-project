import { ITable, ITableBuilder, StringOrNull } from '../types'

export class TableBuilder implements ITableBuilder, ITable {
  private _database: StringOrNull
  private _tableName: StringOrNull
  private _primaryField: StringOrNull
  private _indexName: StringOrNull
  private _version: number = 1

  public withDatabase(databaseName: string): ITableBuilder {
    this._database = databaseName
    return this
  }

  public withTableName(tableName: string): ITableBuilder {
    this._tableName = tableName
    return this
  }

  public withPrimaryField(primaryField: string): ITableBuilder {
    this._primaryField = primaryField
    return this
  }

  public withIndexName(indexName: string): ITableBuilder {
    this._indexName = indexName
    return this
  }

  public withVersion(version: number): ITableBuilder {
    this._version = version
    return this
  }

  public database(): string {
    return this._database
  }

  public version(): number {
    return this._version
  }

  public tableName(): string {
    return this._tableName
  }

  public indexName(): string {
    return this._indexName
  }

  public build(database: IDBDatabase): void {
    const parameters: IDBObjectStoreParameters = { keyPath: this._primaryField }
    const objectStore = database.createObjectStore(this._tableName, parameters)
    objectStore!.createIndex(this._indexName, this._primaryField)
  }
}
