<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $contacts = Contact::query()
            ->when($search, function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Contacts/Index', [
            'items' => $contacts,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Contacts/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'              => ['required', 'string', 'max:255'],
            'phone_code'        => ['required', 'string', 'max:5'],
            'phone'             => ['required', 'string', 'max:50', 'unique:contacts,phone'],
            'cellular_operator' => ['required', 'string'],
            'location_id'       => ['nullable', 'integer'],
            'client_id'         => ['nullable', 'integer'],
        ]);

        Contact::create($data);

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contact created');
    }

    // public function edit(Contact $contact)
    // {
    //     return Inertia::render('Contacts/Edit', [
    //         'item' => $contact,
    //     ]);
    // }

    public function update(Request $request, Contact $contact)
    {
        $data = $request->validate([
            'name'              => ['required', 'string', 'max:255'],
            'phone_code'        => ['required', 'string', 'max:5'],
            'phone'             => ['required', 'string', 'max:50', 'unique:contacts,phone,' . $contact->id],
            'cellular_operator' => ['required', 'string'],
            'location_id'       => ['nullable', 'integer'],
            'client_id'         => ['nullable', 'integer'],
            'status'            => ['required', 'integer'],
        ]);

        $contact->update($data);

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contact updated');
    }

    public function destroy(Contact $contact)
    {
        $contact->update([
            'status' => Contact::STATUS_INACTIVE,
        ]);

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contact removed');
    }
}
