<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class ContactSendmail extends Mailable
{
    use Queueable, SerializesModels;

    private $name;
    private $email;
    private $content;

    /**
     * Create a new message instance.
     */
    public function __construct($contact)
    {
        //
        $this->name = $contact['name'];
        $this->email = $contact['email'];
        $this->content = $contact['content'];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $fromAddress = env('MAIL_FROM_ADDRESS');

        return new Envelope(
            from: new Address($fromAddress, 'risu'),
            replyTo: [
                new Address($this->email, $this->name)
        ],
            subject: 'Contact Sendmail',
        );
        
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return (new Content())->view('mail')
                          ->with([
                              'name' => $this->name,
                              'email' => $this->email,
                              'content' => $this->content,
                          ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
        ];
    }
}
