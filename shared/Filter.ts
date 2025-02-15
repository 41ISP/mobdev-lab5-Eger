class Filter {
    get toDo() {
        return 'Активные'
    }
    
    get done() {
        return 'Выполненные'
    }
    
    get all() {
        return 'Все'
    }

    get filters(){
        return [
            {'label': this.all, 'value': this.all},
            {'label': this.done, 'value': this.done},
            {'label': this.toDo, 'value': this.toDo}
          ]
    }
}
export default Filter