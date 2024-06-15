<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'writter' => $this->writter,
            'isbn' => $this->isbn,
            'description' => $this->description,
            'pages' => $this->pages,
            'publishedYear' => $this->published_year,
            'preview' => $this->preview,
            'content' => $this->content,
            'genre' => [
                'id' => $this->genre_id,
                'name' => $this->genre->name,
            ],
            'subscriptionTypes' => SubscriptionTypeResource::collection($this->subscriptionTypes)
        ];
    }
}
