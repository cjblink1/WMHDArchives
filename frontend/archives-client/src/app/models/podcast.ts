export class Podcast {
    
    podcast_id: number;
    name: string;
    description: string;

    constructor(podcast_id, name, description){
        this.podcast_id = podcast_id;
        this.name = name;
        this.description = description;
    }
}
