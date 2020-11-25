import { Injectable } from '@angular/core';
import Dexie from 'dexie'
import { Genre, SearchOption } from './models'

export const normaliseSearchText = (q: string) => q.trim().toLowerCase()

@Injectable()
export class AnimeDatabase extends Dexie {

    private searchOption: Dexie.Table<SearchOption, number>

    constructor() {
        super('anime')
        this.version(1).stores({
            searchOption: '++id, q'
        })
        this.searchOption = this.table('searchOption')
    }

    async saveSearchOption(s: SearchOption): Promise<any> {
        const gen = s.genre == Genre.Anime? 0: 1
        // remove spaces and turns query to lowercase
        s.q = normaliseSearchText(s.q)
        // select count(*) from searchOption where q = 'abc' and genre = 'anime
        const resultCount = await this.searchOption
            .where('q').equals(s.q)
            .and(doc => doc.genre == gen)
            .count()
        // if no matching results, add search to DB
        if (resultCount <= 0) 
            return this.searchOption.add(s)
    }

    getSearchOptions(): Promise<SearchOption[]>{
        return this.searchOption.orderBy('q').toArray()
    }

}




// import { Injectable } from '@angular/core';
// import Dexie from 'dexie';
// import { Todo } from './models';

// @Injectable()
// export class TodoDatabase extends Dexie {

//   private todo: Dexie.Table<Todo, string>;

//   constructor() {
//     // database name
//     super('tododb')

//     // setup the schema for v1
//     this.version(1).stores({
//       todo: "id"
//     })

//     // get a reference to the todo collection
//     this.todo = this.table('todo')
//   }

//   async addTodo(t: Todo): Promise<any> {
//     return await this.todo.put(t)
//   }

// }
